package com.ecommerce.shop.Services.Impl;

import com.ecommerce.shop.Config.AppEnums.*;
import com.ecommerce.shop.DTO.OrderDto;
import com.ecommerce.shop.DTO.OrderItemDto;
import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.DTO.RequestsDto.OrderRequestDto;
import com.ecommerce.shop.DTO.ResponseDTOs.OrdersResponseDto;
import com.ecommerce.shop.Entities.*;
import com.ecommerce.shop.Exceptions.ApiException;
import com.ecommerce.shop.Exceptions.ResourceNotFoundException;
import com.ecommerce.shop.Repositories.*;
import com.ecommerce.shop.Services.CartService;
import com.ecommerce.shop.Services.OrderService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.ecommerce.shop.util.productsUtil.calculateFinalPriceForProduct;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final CartRepository cartRepository;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;
    private final ModelMapper modelMapper;

    @Autowired
    public OrderServiceImpl(CartRepository cartRepository, PaymentRepository paymentRepository, OrderRepository orderRepository, OrderItemRepository orderItemRepository, ProductRepository productRepository, CartService cartService, ModelMapper modelMapper) {
        this.cartRepository = cartRepository;
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.cartService = cartService;
        this.modelMapper = modelMapper;
    }


    @Override
    public OrdersResponseDto getOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        log.debug("In getOrders service implementation");

        Page<Order> ordersPage;
        List<Order> orders ;
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        ordersPage = orderRepository.findAll(pageDetails);
        orders = ordersPage.getContent();

        if(orders.isEmpty())
            return new OrdersResponseDto();

        List<OrderDto> ordersDtoList = orders.stream().map(order -> {
            OrderDto orderDto =  modelMapper.map(order, OrderDto.class);
            return orderDto;
        }).toList();

        return OrdersResponseDto.builder()
                .orders(ordersDtoList)
                .pageNumber(ordersPage.getNumber())
                .pageSize(ordersPage.getSize())
                .totalElements(ordersPage.getTotalElements())
                .totalPages(ordersPage.getTotalPages())
                .isLastPage(ordersPage.isLast())
                .build();
    }

    @Override
    public OrderDto updateOrderStatus(Long orderId, OrderStatus status) {
        log.debug("Inside updateOrderStatus service implementation");

        Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setOrderStatus(status);
        orderRepository.save(order);
        return modelMapper.map(order, OrderDto.class);
    }

    @Override
    @Transactional
    public OrderDto placeOrder(User user, OrderRequestDto orderRequest) throws StripeException {
        PaymentIntent intent = PaymentIntent.retrieve(orderRequest.getPgPaymentId());
        Cart userCart = cartRepository.findCartByUserId(user.getUserId());
        if(userCart == null)
            throw new ResourceNotFoundException("Cart","UserId",user.getUserId());
        Order order = new Order();
        order.setUserId(user.getUserId());
        order.setEmail(user.getEmail());
        order.setAddress(user.getAddress());
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(userCart.getTotalPrice());
        order.setOrderStatus(OrderStatus.PREPARING);



        PaymentMethod paymentMethod = retrievePaymentMethodFromStripeRequest(intent);
        Payment payment = new Payment(
                                paymentMethod,
                                orderRequest.getPgPaymentId(),
                                orderRequest.getPgStatus(),
                                orderRequest.getPgResponseMessage(),
                                orderRequest.getPgName());
        payment.setOrder(order);
        payment = paymentRepository.save(payment);
        order.setPayment(payment);

        Order savedOrder = orderRepository.save(order);

        List<CartProduct> cartProducts = userCart.getCartItems();

        if(cartProducts.isEmpty())
            throw new ApiException("Cart is empty");
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartProduct cartProduct : cartProducts) {
            OrderItem orderItem = new OrderItem();
            orderItem.setDiscount(cartProduct.getDiscount());
            orderItem.setProductId(cartProduct.getProduct().getProductId());
            orderItem.setProductName(cartProduct.getProduct().getProductName());
            orderItem.setOriginalPrice(cartProduct.getProductPrice());
            orderItem.setQuantity(cartProduct.getRequestedQuantity());
            orderItem.setOrder(savedOrder);
            orderItems.add(orderItem);
        }
        orderItemRepository.saveAll(orderItems);

        List<CartProduct> itemsCopy = new ArrayList<>(cartProducts);
        itemsCopy.forEach(item -> {
            int requestedQuantity = item.getRequestedQuantity();
            Product product = item.getProduct();
            product.setAvailableQuantity(product.getAvailableQuantity() - requestedQuantity);
            productRepository.save(product);
            cartService.deleteProduct(product.getProductId());
        });

        OrderDto orderDto = modelMapper.map(order, OrderDto.class);
        orderItems.forEach(item ->
                orderDto.getOrderItems().add(
                        modelMapper.map(item, OrderItemDto.class)));

        orderDto.getOrderItems().forEach(item ->
                item.setFinalPrice(calculateFinalPriceForProduct(item.getOriginalPrice(),item.getDiscount())));
        return orderDto;
    }

    private static PaymentMethod retrievePaymentMethodFromStripeRequest(PaymentIntent intent) throws StripeException {
        com.stripe.model.PaymentMethod pm = com.stripe.model.PaymentMethod.retrieve(intent.getPaymentMethod());
        String pmType = pm.getType();

        return switch (pmType) {
            case "card" -> PaymentMethod.CARD;
            case "paypal" -> PaymentMethod.PAYPAL;
            case "revolut_pay" -> PaymentMethod.REVOLUT;
            default -> throw new IllegalArgumentException("Unsupported payment method: " + pmType);
        };
    }
}
