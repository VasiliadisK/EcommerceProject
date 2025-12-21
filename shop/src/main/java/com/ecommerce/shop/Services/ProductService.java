package com.ecommerce.shop.Services;

import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.Requests.ProductRequestBody;
import jakarta.validation.Valid;

import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProducts();

    ProductDto getProductById(Long productId);

    List<ProductDto> getProductsByKeyword(String keyword);

    List<ProductDto> getProductsByCategory(Long categoryId);

    ProductDto addProduct(Long categoryId, @Valid ProductRequestBody productRequest);

    ProductDto updateProduct(Long productId, @Valid ProductRequestBody productDTO);

    ProductDto deleteProduct(Long productId);
}
