package com.ecommerce.shop.Services;

import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.DTO.ResponseDTOs.ProductResponseDto;
import com.ecommerce.shop.DTO.RequestsDto.ProductRequestDto;
import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {
    ProductResponseDto getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductDto getProductById(Long productId);

    ProductResponseDto getProductsByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponseDto getProductsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductDto addProduct(Long categoryId, @Valid ProductRequestDto productRequest);

    ProductDto updateProduct(Long productId, @Valid ProductRequestDto productDTO);

    ProductDto deleteProduct(Long productId);

    ProductDto updateProductImage(Long productId, MultipartFile image) throws IOException;
}
