package com.ecommerce.shop.Services;

import com.ecommerce.shop.DTO.CategoryDto;
import com.ecommerce.shop.DTO.ResponseDTOs.CategoryResponseDto;
import com.ecommerce.shop.RequestModels.CategoryRequestModel;
import jakarta.validation.Valid;


public interface CategoryService {

    CategoryResponseDto getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    CategoryDto getCategoryById(Long categoryId);

    CategoryDto createNewCategory(@Valid CategoryRequestModel categoryRequestModel);

    CategoryDto deleteCategory(Long categoryId);

    CategoryDto updateCategory(@Valid CategoryDto categoryDTO, Long categoryId);
}
