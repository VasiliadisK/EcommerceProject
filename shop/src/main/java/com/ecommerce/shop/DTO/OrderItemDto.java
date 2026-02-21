package com.ecommerce.shop.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {
    private Long orderItemId;
    private Long productId;
    private Integer quantity;
    private double discount;
    private double originalPrice;
    private double finalPrice;
}
