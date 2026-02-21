package com.ecommerce.shop.Repositories;

import com.ecommerce.shop.Entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
