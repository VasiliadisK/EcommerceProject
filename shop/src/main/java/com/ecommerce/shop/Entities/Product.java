package com.ecommerce.shop.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productId")
    private Long productId;
    @NotBlank
    @Size(min = 3, message = "Product name must contain atleast 3 characters")
    private String productName;
    private String image;
    @NotBlank
    @Size(min = 6, message = "Product description must contain atleast 6 characters")
    private String description;
    @NotNull(message = "quantity is required")
    private Integer quantity;
    @NotNull(message = "price is required")
    private double price;
    @NotNull(message = "hasDiscount is required")
    private boolean hasDiscount;
    @NotNull(message = "discount is required")
    private double discount;
    @NotNull(message = "finalPrice is required")
    private double finalPrice;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
