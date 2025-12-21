package com.ecommerce.shop.Requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestBody {

    private String productName;
    private String description;
    private Integer quantity;
    private double price;
    private boolean hasDiscount;
    private double discount;
    private double finalPrice;
}
