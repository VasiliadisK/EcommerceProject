package com.ecommerce.shop.Services;

import com.ecommerce.shop.Config.AppEnums;
import com.ecommerce.shop.DTO.OrderDto;
import com.ecommerce.shop.DTO.RequestsDto.OrderRequestDto;
import com.ecommerce.shop.Entities.User;
import com.stripe.exception.StripeException;
import jakarta.validation.Valid;

public interface OrderService {
    OrderDto placeOrder(User user, @Valid OrderRequestDto orderRequest) throws StripeException;
}
