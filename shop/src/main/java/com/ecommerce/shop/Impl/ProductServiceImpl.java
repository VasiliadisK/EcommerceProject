package com.ecommerce.shop.Impl;

import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.Entities.Category;
import com.ecommerce.shop.Entities.Product;
import com.ecommerce.shop.Exceptions.ApiException;
import com.ecommerce.shop.Exceptions.ResourceAlreadyExistsException;
import com.ecommerce.shop.Exceptions.ResourceNotFoundException;
import com.ecommerce.shop.Repositories.CategoryRepository;
import com.ecommerce.shop.Repositories.ProductRepository;
import com.ecommerce.shop.Requests.ProductRequestBody;
import com.ecommerce.shop.Services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, ModelMapper modelMapper, CategoryRepository categoryRepository)
    {
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
        this.categoryRepository = categoryRepository;
    }


    @Override
    public List<ProductDto> getAllProducts() {

        log.debug("Into getAllProducts service implementation");
        List<Product> products = productRepository.findAll();

        if(products.isEmpty())
            throw new ResourceNotFoundException("products");

        return products.stream().map(product -> modelMapper.map(product, ProductDto.class)).toList();
    }

    @Override
    public ProductDto getProductById(Long productId) {
        log.debug("Into getProductById service implementation");

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product","productId",productId));

        return modelMapper.map(product,ProductDto.class);

    }

    @Override
    public List<ProductDto> getProductsByKeyword(String keyword) {
        log.debug("Into getProductsByKeyword service implementation");

        List<Product> products = productRepository.findAllByKeyword(keyword);

        if(products.isEmpty())
            throw new ResourceNotFoundException("Products","keyword",keyword);

        return products.stream().map(product -> modelMapper.map(product, ProductDto.class)).toList();
    }

    @Override
    public List<ProductDto> getProductsByCategory(Long categoryId) {
        log.debug("Into getProductsByCategory service implementation");

        List<Product> products = productRepository.findAllByCategory(categoryId);

        if(products.isEmpty())
            throw new ResourceNotFoundException("Products","category",categoryId);

        return products.stream().map(product -> modelMapper.map(product, ProductDto.class)).toList();
    }

    @Override
    public ProductDto addProduct(Long categoryId, ProductRequestBody productRequest) {
        log.debug("Into addProduct service implementation");

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category","categoryId",categoryId));

        if (productRepository.existsByProductName(productRequest.getProductName())) {
            throw new ResourceAlreadyExistsException("Product", "name", productRequest.getProductName());
        }

        Product productToAdd = modelMapper.map(productRequest, Product.class);
        productToAdd.setCategory(category);

        Product addedProduct = productRepository.save(productToAdd);
        return modelMapper.map(addedProduct, ProductDto.class);

    }

    @Override
    public ProductDto updateProduct(Long productId, ProductRequestBody productRequestBody) {
            Product productFromDb = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

            Product product = modelMapper.map(productRequestBody, Product.class);

            productFromDb.setProductName(product.getProductName());
            productFromDb.setDescription(product.getDescription());
            productFromDb.setQuantity(product.getQuantity());
            productFromDb.setHasDiscount(product.isHasDiscount());
            productFromDb.setDiscount(product.getDiscount());
            productFromDb.setPrice(product.getPrice());
            productFromDb.setFinalPrice(product.getFinalPrice());

            Product savedProduct = productRepository.save(productFromDb);

            return modelMapper.map(savedProduct, ProductDto.class);
    }

    @Override
    public ProductDto deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        productRepository.delete(product);
        return modelMapper.map(product, ProductDto.class);
    }
}
