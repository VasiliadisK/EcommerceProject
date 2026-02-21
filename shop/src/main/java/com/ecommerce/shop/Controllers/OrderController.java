package com.ecommerce.shop.Controllers;

import com.ecommerce.shop.DTO.OrderDto;
import com.ecommerce.shop.DTO.RequestsDto.OrderRequestDto;
import com.ecommerce.shop.Entities.User;
import com.ecommerce.shop.Services.OrderService;
import com.ecommerce.shop.util.AuthUtil;
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

    @PostMapping("/order/users/payments/{paymentMethod}")
    public ResponseEntity<OrderDto> orderProducts(@PathVariable PaymentMethod paymentMethod, @Valid @RequestBody OrderRequestDto orderRequest){
        log.debug("Inside orderProducts controller with payment method {} and order id {}",paymentMethod,orderRequest.getPgPaymentId());

        User loggedInUser = authUtil.loggedInUser();
        OrderDto order = orderService.placeOrder(loggedInUser, paymentMethod, orderRequest);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
}
