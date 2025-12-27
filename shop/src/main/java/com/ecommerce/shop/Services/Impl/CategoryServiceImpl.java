package com.ecommerce.shop.Services.Impl;

import com.ecommerce.shop.DTO.CategoryDto;
import com.ecommerce.shop.DTO.ResponseDTOs.CategoryResponseDto;
import com.ecommerce.shop.Entities.Category;
import com.ecommerce.shop.Exceptions.ApiException;
import com.ecommerce.shop.Exceptions.ResourceNotFoundException;
import com.ecommerce.shop.Repositories.CategoryRepository;
import com.ecommerce.shop.DTO.RequestsDto.CategoryRequestDto;
import com.ecommerce.shop.Services.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public CategoryResponseDto getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        log.debug("into getAllCategories service implementation");

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Category> categoryPage = categoryRepository.findAll(pageDetails);
        List<Category> categories = categoryPage.getContent();

        if(categories.isEmpty())
            throw new ApiException("No categories currently exist in the database");
        List<CategoryDto> categoryDtoList = categories.stream().map(category -> modelMapper.map(category, CategoryDto.class)).toList();

        return CategoryResponseDto.builder()
                .categories(categoryDtoList)
                .pageNumber(categoryPage.getNumber())
                .pageSize(categoryPage.getSize())
                .totalElements(categoryPage.getTotalElements())
                .totalPages(categoryPage.getTotalPages())
                .isLastPage(categoryPage.isLast())
                .build();
    }

    @Override
    public CategoryDto getCategoryById(Long categoryId) {
        log.debug("into getCategoryById service implementation");

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ApiException("No category with id " + categoryId + " exists"));
        return modelMapper.map(category, CategoryDto.class);

    }

    @Override
    public CategoryDto createNewCategory(CategoryRequestDto categoryRequestDto) {
        log.debug("into createNewCategory service implementation");

        Category categoryFromDb = categoryRepository.findByName(categoryRequestDto.getCategoryName());
        if (categoryFromDb != null)
            throw new ApiException("Category with the name " + categoryFromDb.getCategoryName() + " already exists");

        Category category = modelMapper.map(categoryRequestDto, Category.class);
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
