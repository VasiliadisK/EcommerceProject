package com.ecommerce.shop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Long productId;
    private String productName;
    private String image;
    private String description;
    private Integer availableQuantity;
    private double price;
    private Long categoryId;
    private boolean hasDiscount;
    private double discount;
    private double finalPrice;
    private Integer requestedQuantity;
}
