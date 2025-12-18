package com.ecommerce.shop.Services;

import com.ecommerce.shop.DTO.CategoryDto;
import com.ecommerce.shop.Entities.Category;
import com.ecommerce.shop.RequestModels.CategoryRequestModel;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {

    List<CategoryDto> getAllCategories();

    CategoryDto getCategoryById(Long categoryId);

    CategoryDto createNewCategory(@Valid CategoryRequestModel categoryRequestModel);

    CategoryDto deleteCategory(Long categoryId);

    CategoryDto updateCategory(@Valid CategoryDto categoryDTO, Long categoryId);
}
