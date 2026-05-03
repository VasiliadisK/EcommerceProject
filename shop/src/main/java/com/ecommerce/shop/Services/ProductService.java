package com.ecommerce.shop.Services;

import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.DTO.ResponseDTOs.ProductResponseDto;
import com.ecommerce.shop.DTO.RequestsDto.ProductRequestDto;
import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductResponseDto getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, Long categoryId);

    ProductDto getProductById(Long productId);

    ProductResponseDto getProductsByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponseDto getProductsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductDto addProduct(Long categoryId, @Valid ProductRequestDto productRequest);

    ProductDto updateProduct(Long categoryId, Long productId, @Valid ProductRequestDto productDTO);

    ProductDto deleteProduct(Long productId);

    ProductDto updateProductImage(Long productId, MultipartFile image) throws IOException;

    List<ProductDto> addMultipleProducts(Long categoryId, @Valid List<ProductRequestDto> productsRequest);
}
