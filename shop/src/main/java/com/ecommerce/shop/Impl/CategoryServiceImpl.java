package com.ecommerce.shop.Impl;

import com.ecommerce.shop.DTO.CategoryDto;
import com.ecommerce.shop.Entities.Category;
import com.ecommerce.shop.Exceptions.ApiException;
import com.ecommerce.shop.Exceptions.ResourceNotFoundException;
import com.ecommerce.shop.Repositories.CategoryRepository;
import com.ecommerce.shop.RequestModels.CategoryRequestModel;
import com.ecommerce.shop.Services.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Slf4j
@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public List<CategoryDto> getAllCategories() {
        log.debug("into getAllCategories service implementation");

        List<Category> categories = categoryRepository.findAll();
        if(categories.isEmpty())
            throw new ApiException("No categories currently exist in the database");
        return categories.stream().map(category -> modelMapper.map(category, CategoryDto.class)).toList();
    }

    @Override
    public CategoryDto getCategoryById(Long categoryId) {
        log.debug("into getCategoryById service implementation");

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ApiException("No category with id " + categoryId + " exists"));
        return modelMapper.map(category, CategoryDto.class);

    }

    @Override
    public CategoryDto createNewCategory(CategoryRequestModel categoryRequestModel) {
        log.debug("into createNewCategory service implementation");

        Category categoryFromDb = categoryRepository.findByName(categoryRequestModel.getCategoryName());
        if (categoryFromDb != null)
            throw new ApiException("Category with the name " + categoryFromDb.getCategoryName() + " already exists");

        Category category = modelMapper.map(categoryRequestModel, Category.class);
        Category savedCategory = categoryRepository.save(category);

        return modelMapper.map(savedCategory, CategoryDto.class);
    }

    @Override
    public CategoryDto deleteCategory(Long categoryId) {
        log.debug("into deleteCategory service implementation");

        Category category = categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new ResourceNotFoundException("Category","categoryId",categoryId));
        categoryRepository.delete(category);
        return modelMapper.map(category, CategoryDto.class);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDTO, Long categoryId) {
        log.debug("into updateCategory service implementation");

        Category savedCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        savedCategory.setCategoryName(categoryDTO.getCategoryName());
        Category updatedCategory = categoryRepository.save(savedCategory);
        return modelMapper.map(updatedCategory, CategoryDto.class);

    }
}
