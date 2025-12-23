package com.ecommerce.shop.Repositories;

import com.ecommerce.shop.Entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.productName LIKE CONCAT('%', :keyword, '%')")
    Page<Product> findAllByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category.categoryId= :categoryId")
    Page<Product> findAllByCategory(@Param("categoryId") Long categoryId, Pageable pageable);

    boolean existsByProductName(String productName);
}
