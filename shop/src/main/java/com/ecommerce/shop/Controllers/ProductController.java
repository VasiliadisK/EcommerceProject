package com.ecommerce.shop.Controllers;

import com.ecommerce.shop.Config.AppConstants;
import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.DTO.ResponseDTOs.ProductResponseDto;
import com.ecommerce.shop.DTO.RequestsDto.ProductRequestDto;
import com.ecommerce.shop.Services.ProductService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService)
    {
        this.productService = productService;
    }


    @GetMapping("/public/products")
    public ResponseEntity<ProductResponseDto> getAllProducts(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCTS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ){
        ProductResponseDto productResponse = productService.getAllProducts(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse,HttpStatus.OK);
    }

    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponseDto> getProductsByCategory(@PathVariable Long categoryId,
                                                                 @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                                 @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                                 @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCTS_BY, required = false) String sortBy,
                                                                 @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder){
        ProductResponseDto productResponse = productService.getProductsByCategory(categoryId, pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponseDto> getProductsByKeyword(@PathVariable String keyword,
                                                                @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                                @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                                @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCTS_BY, required = false) String sortBy,
                                                                @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder){
        ProductResponseDto productResponse = productService.getProductsByKeyword(keyword, pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }


    @GetMapping("/public/products/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long productId)
    {
        log.debug("into getProductById controller");

        ProductDto productDto = productService.getProductById(productId);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDto> AddProduct(@PathVariable Long categoryId, @Valid @RequestBody ProductRequestDto productRequest)
    {
        log.debug("into AddProduct controller");

        ProductDto productDto = productService.addProduct(categoryId, productRequest);
        return new ResponseEntity<>(productDto, HttpStatus.CREATED);

    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/categories/{categoryId}/products")
    public ResponseEntity<List<ProductDto>> AddMultipleProducts(@PathVariable Long categoryId, @Valid @RequestBody List<ProductRequestDto> productsRequest)
    {
        log.debug("into AddProductsToCategory controller");

        List<ProductDto> productsDto = productService.addMultipleProducts(categoryId, productsRequest);
        return new ResponseEntity<>(productsDto, HttpStatus.CREATED);

    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@Valid @RequestBody ProductRequestDto productRequestDto,
                                                    @PathVariable Long productId){
        log.debug("into updateProduct controller");

        ProductDto updatedProductDTO = productService.updateProduct(productId, productRequestDto);
        return new ResponseEntity<>(updatedProductDTO, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDto> deleteProduct(@PathVariable Long productId){
        log.debug("into deleteProduct controller");

        ProductDto deletedProduct = productService.deleteProduct(productId);
        return new ResponseEntity<>(deletedProduct, HttpStatus.OK);
    }

    @PutMapping("/admin/products/{productId}/image")
    public ResponseEntity<ProductDto> updateProductImage(@PathVariable Long productId,
                                                         @RequestParam(name = "image") MultipartFile image) throws IOException {
        log.debug("into updateProductImage controller");

        ProductDto updatedProduct = productService.updateProductImage(productId, image);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
}
