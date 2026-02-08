package com.ecommerce.shop.Repositories;

import com.ecommerce.shop.Entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("SELECT c FROM Cart c WHERE c.user.userId = :userId")
    Cart findCartByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM Cart c JOIN FETCH c.cartItems ci JOIN FETCH ci.product p WHERE p.productId = :productId")
    List<Cart> findCartsByProductId(@Param("productId") Long productId);
}
