package com.ecommerce.shop.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "Order_Item")
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;
    private Long productId;
    private Integer quantity;
    private double discount;
    private double originalPrice;
    @ManyToOne
    @JoinColumn(name = "orderId")
    private Order order;

}
