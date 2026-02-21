package com.ecommerce.shop.Repositories;

import com.ecommerce.shop.Entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
