package com.ecommerce.shop.Controllers;

import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.Requests.ProductRequestBody;
import com.ecommerce.shop.Services.ProductService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService)
    {
        this.productService = productService;
    }


    @GetMapping("/public/products")
    public ResponseEntity<List<ProductDto>> getAllProducts()
    {
        log.debug("into getAllProducts controller");

        List<ProductDto> productDtos = productService.getAllProducts();
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping("/public/products/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long productId)
    {
        log.debug("into getProductById controller");

        ProductDto productDto = productService.getProductById(productId);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<List<ProductDto>> getProductsByKeword(@PathVariable String keyword)
    {
        log.debug("into getProductsByKeword controller");

        List<ProductDto> productDtos = productService.getProductsByKeyword(keyword);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);

    }

    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable Long categoryId)
    {
        log.debug("into getProductsByCategory controller");

        List<ProductDto> productDto = productService.getProductsByCategory(categoryId);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @PostMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDto> AddProduct(@PathVariable Long categoryId, @Valid @RequestBody ProductRequestBody productRequest)
    {
        log.debug("into AddProduct controller");

        ProductDto productDto = productService.addProduct(categoryId, productRequest);
        return new ResponseEntity<>(productDto, HttpStatus.CREATED);

    }

    @PutMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@Valid @RequestBody ProductRequestBody productRequestBody,
                                                    @PathVariable Long productId){
        ProductDto updatedProductDTO = productService.updateProduct(productId, productRequestBody);
        return new ResponseEntity<>(updatedProductDTO, HttpStatus.OK);
    }

    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDto> deleteProduct(@PathVariable Long productId){
        ProductDto deletedProduct = productService.deleteProduct(productId);
        return new ResponseEntity<>(deletedProduct, HttpStatus.OK);
    }
}
