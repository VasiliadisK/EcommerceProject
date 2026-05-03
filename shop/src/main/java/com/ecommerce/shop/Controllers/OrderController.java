package com.ecommerce.shop.Controllers;

import com.ecommerce.shop.DTO.OrderDto;
import com.ecommerce.shop.DTO.RequestsDto.OrderRequestDto;
import com.ecommerce.shop.DTO.RequestsDto.StripePaymentDto;
import com.ecommerce.shop.Entities.User;
import com.ecommerce.shop.Services.OrderService;
import com.ecommerce.shop.Services.StripeService;
import com.ecommerce.shop.util.AuthUtil;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecommerce.shop.Config.AppEnums.*;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class OrderController {

    private final AuthUtil authUtil;
    private OrderService orderService;
    private StripeService stripeService;
    @PostMapping("/order/users/payments/confirmOrder")
    public ResponseEntity<OrderDto> orderProducts(@Valid @RequestBody OrderRequestDto orderRequest) throws StripeException {
        log.debug("Inside orderProducts controller with payment method {} and order id {}",orderRequest.getPaymentMethod(),orderRequest.getPgPaymentId());

        User loggedInUser = authUtil.loggedInUser();
        OrderDto order = orderService.placeOrder(loggedInUser, orderRequest);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @PostMapping("/order/stripe-client-secret")
    public ResponseEntity<String> createStripeClientSecret(@RequestBody StripePaymentDto stripePaymentDto) throws StripeException {
        log.debug("Inside createStripeClientSecret method");

        PaymentIntent paymentIntent = stripeService.paymentIntent(stripePaymentDto);
        return new ResponseEntity<>(paymentIntent.getClientSecret(), HttpStatus.CREATED);
    }
}
