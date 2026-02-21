package com.ecommerce.shop.DTO;

import com.ecommerce.shop.Config.AppEnums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long orderId;
    private String email;
    private OrderStatus orderStatus;
    private LocalDate orderDate;
    private Double totalAmount;
    private PaymentDto payment;
    private List<OrderItemDto> orderItems;
    private Long userId;
}
