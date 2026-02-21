package com.ecommerce.shop.Services.Impl;

import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.DTO.ResponseDTOs.CartResponseDto;
import com.ecommerce.shop.Entities.Cart;
import com.ecommerce.shop.Entities.CartProduct;
import com.ecommerce.shop.Entities.Product;
import com.ecommerce.shop.Exceptions.ApiException;
import com.ecommerce.shop.Exceptions.ResourceNotFoundException;
import com.ecommerce.shop.Repositories.CartProductRepository;
import com.ecommerce.shop.Repositories.CartRepository;
import com.ecommerce.shop.Repositories.ProductRepository;
import com.ecommerce.shop.Services.CartService;
import com.ecommerce.shop.util.AuthUtil;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class CartServiceImpl implements CartService {

    private AuthUtil authUtil;
    private CartRepository cartRepository;
    private ProductRepository productRepository;
    private ModelMapper modelMapper;
    private CartProductRepository cartProductRepository;

    @Override
    public CartResponseDto addProductToCart(Long productId, Integer requestedQuantity) {

        log.debug("Inside addProductToCart service implementation");
        Cart cart  = createCart();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        CartProduct cartItem = cartProductRepository.findCartProductByProductIdAndCartId(productId, cart.getCartId());

        if (cartItem != null) {
            throw new ApiException("Product " + product.getProductName() + " already exists in the cart");
        }

        if (product.getAvailableQuantity() == 0) {
            throw new ApiException(product.getProductName() + " is not available");
        }

        if (product.getAvailableQuantity() < requestedQuantity) {
            throw new ApiException("Please, make an order of the " + product.getProductName()
                    + " less than or equal to the available quantity " + product.getAvailableQuantity() + ".");
        }

        CartProduct productInCart = cartProductRepository.findCartProductByProductId(product.getProductId());

        if(productInCart == null){
            CartProduct newCartProduct = new CartProduct();

            newCartProduct.setProduct(product);
            newCartProduct.setCart(cart);
            newCartProduct.setRequestedQuantity(requestedQuantity);
            newCartProduct.setDiscount(product.getDiscount());
            newCartProduct.setProductPrice(product.getFinalPrice());
            cartProductRepository.save(newCartProduct);
        }
        else{
            productInCart.setRequestedQuantity(productInCart.getRequestedQuantity()+requestedQuantity);
            cartProductRepository.save(productInCart);
        }


        cart.setTotalPrice(cart.getTotalPrice() + (product.getFinalPrice() * requestedQuantity));

        cartRepository.save(cart);
        return getCartResponseDto(cart);
    }

    private CartResponseDto getCartResponseDto(Cart cart) {

        List<CartProduct> cartItems = cart.getCartItems();
        CartResponseDto cartDTO = modelMapper.map(cart, CartResponseDto.class);

        List<ProductDto> productStream = cartItems.stream().map(item -> {
            ProductDto map = modelMapper.map(item.getProduct(), ProductDto.class);
            map.setAvailableQuantity(item.getProduct().getAvailableQuantity());
            map.setRequestedQuantity(item.getRequestedQuantity());
            return map;
        }).toList();

        cartDTO.setProductsList(productStream);
        return cartDTO;
    }

    private Cart createCart() {
        Cart userCart  = cartRepository.findCartByUserId(authUtil.loggedInUserId());
        if(userCart != null){
            return userCart;
        }

        Cart cart = new Cart();
        cart.setTotalPrice(0.00);
        cart.setUser(authUtil.loggedInUser());
        return cartRepository.save(cart);
    }

    @Override
    public List<CartResponseDto> getAllCarts() {
        log.debug("Inside getAllCarts service implementation");

        List<Cart> carts = cartRepository.findAll();

        if(carts.isEmpty())
            throw new ResourceNotFoundException("carts");

        List<CartResponseDto> cartDtos = new ArrayList<>();
        carts.forEach(cart -> cartDtos.add(getCartResponseDto(cart)));
        return cartDtos;
    }

    @Override
    public CartResponseDto getCartByCartId(Long cartId) {
        log.debug("Inside getCartByCartId service implementation");
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("cart","cartId",cartId));
        return getCartResponseDto(cart);
    }

    @Override
    public CartResponseDto getLoggedInUserCart() {
        log.debug("Inside getLoggedInUserCart service implementation");

        Cart userCart  = cartRepository.findCartByUserId(authUtil.loggedInUserId());
        if(userCart != null){
            return getCartResponseDto(userCart);
        }
        else
            throw new ResourceNotFoundException("cart","userId",authUtil.loggedInUserId());
    }

    @Override
    @Transactional
    public CartResponseDto updateProductQuantity(Long productId, Integer quantity) {
        log.debug("Inside updateProductQuantity service implementation with productId {}", productId);

        Cart userCart  = cartRepository.findCartByUserId(authUtil.loggedInUserId());
        if(userCart == null)
            throw new ResourceNotFoundException("cart","userId",authUtil.loggedInUserId());
        Product product = productRepository.findById(productId)
                .orElseThrow(() ->  new ResourceNotFoundException("product","productId",productId));

        if (product.getAvailableQuantity() == 0) {
            throw new ApiException(product.getProductName() + " is not available");
        }

        CartProduct cartProduct = cartProductRepository.findCartProductByProductIdAndCartId(productId,userCart.getCartId());

        if(cartProduct == null)
            throw new ApiException("Product with productId "+ productId+" not found in cart of user "+authUtil.loggedInEmail());

        if (product.getAvailableQuantity() < cartProduct.getRequestedQuantity()+quantity ) {
            throw new ApiException("Please, make an order of the " + product.getProductName()
                    + " less than or equal to the available quantity " + product.getAvailableQuantity() + ".");
        }

        productRepository.save(product);
        userCart.setTotalPrice(userCart.getTotalPrice() + (cartProduct.getProductPrice()*quantity));

        if(cartProduct.getRequestedQuantity() + quantity <= 0) {
            userCart.getCartItems().remove(cartProduct);
            cartProductRepository.deleteByCartProductId(cartProduct.getCartProductId());
        } else {
            cartProduct.setRequestedQuantity(cartProduct.getRequestedQuantity() + quantity);
            cartProductRepository.save(cartProduct);
        }
        cartRepository.save(userCart);
        return getCartResponseDto(userCart);
    }

    @Override
    public String deleteProduct(Long cartId, Long productId) {
        log.debug("Inside deleteProduct service implementation with cart id {} and product id {}", cartId, productId);

        Cart dbCart = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Cart","cartId",cartId));
        CartProduct dbCartProduct = cartProductRepository.findCartProductByProductIdAndCartId(productId, cartId);
        Product dbProduct = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product","productId",productId));
        if(dbCartProduct == null)
            throw new ResourceNotFoundException("cartProcut","productId",productId);

        dbCart.setTotalPrice(dbCart.getTotalPrice() - (dbCartProduct.getProductPrice()*dbCartProduct.getRequestedQuantity()));
        dbCart.getCartItems().removeIf(cp -> Objects.equals(cp.getCartProductId(), dbCartProduct.getCartProductId()));
        cartRepository.save(dbCart);
        cartProductRepository.deleteByCartProductId(dbCartProduct.getCartProductId());
        productRepository.save(dbProduct);
        return "Product "+ dbProduct.getProductName() +" was removed from the cart successfully";

    }
}
