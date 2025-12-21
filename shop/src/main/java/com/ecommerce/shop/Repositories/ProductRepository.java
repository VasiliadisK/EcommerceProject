package com.ecommerce.shop.Repositories;

import com.ecommerce.shop.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.productName LIKE CONCAT('%', :keyword, '%')")
    List<Product> findAllByKeyword(@Param("keyword") String keyword);

    @Query("SELECT p FROM Product p WHERE p.category.categoryId= :categoryId")
    List<Product> findAllByCategory(@Param("categoryId") Long categoryId);

    boolean existsByProductName(String productName);
}
