package com.ecommerce.shop.DTO.RequestsDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDto {

    private String productName;
    private String description;
    private Integer quantity;
    private double price;
    private boolean hasDiscount;
    private double discount;
}
