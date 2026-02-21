package com.ecommerce.shop.Repositories;

import com.ecommerce.shop.Entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
