package com.ecommerce.shop.Repositories;

import com.ecommerce.shop.Entities.CartProduct;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Transactional
public interface CartProductRepository extends JpaRepository<CartProduct, Long> {

    @Query("SELECT cp FROM CartProduct cp WHERE cp.cart.cartId = :cartId AND cp.product.productId = :productId")
    CartProduct findCartProductByProductIdAndCartId(@Param(value = "productId") Long productId, @Param(value = "cartId") Long cartId);

    @Query("SELECT cp FROM CartProduct cp WHERE cp.product.productId = :productId")
    CartProduct findCartProductByProductId(@Param(value = "productId") Long productId);

    @Modifying
    @Query("DELETE FROM CartProduct cp WHERE cp.cartProductId= :cartProductId")
    void deleteByCartProductId(@Param(value = "cartProductId") Long cartProductId);

    @Query("SELECT cp FROM CartProduct cp JOIN FETCH cp.product p WHERE p.productId = :productId")
    List<CartProduct> findAllByProductId(@Param(value = "productId") Long productId);

    @Query("DELETE FROM CartProduct cp WHERE cp.cart.cartId = :cartId")
    @Modifying
    void deleteByCartId(@Param("cartId") Long cartId);
}
