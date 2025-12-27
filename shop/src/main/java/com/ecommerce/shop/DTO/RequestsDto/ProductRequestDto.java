package com.ecommerce.shop.DTO.RequestsDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDto {

    @NotBlank(message = "product name is required")
    private String productName;
    @NotBlank(message = "description is required")
    private String description;
    @NotNull(message = "quantity is required")
    private Integer quantity;
    @NotNull(message = "price is required")
    private double price;
    @NotNull(message = "hasDiscount is required")
    private boolean hasDiscount;
    @NotNull(message = "discount is required")
    private double discount;
}
