package com.ecommerce.shop.Repositories;

import com.ecommerce.shop.Entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    @Query("SELECT c FROM Category c WHERE c.categoryName = :categoryName")
    Category findByName(@Param(value = "categoryName") String categoryName);
}
