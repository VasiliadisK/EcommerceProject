package com.ecommerce.shop.Impl;

import com.ecommerce.shop.Constants.AppConstants;
import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.DTO.ResponseDTOs.ProductResponseDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final CategoryRepository categoryRepository;
    private final FileServiceImpl fileServiceImpl;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, ModelMapper modelMapper, CategoryRepository categoryRepository, FileServiceImpl fileServiceImpl)
    {
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
        this.categoryRepository = categoryRepository;
        this.fileServiceImpl = fileServiceImpl;
    }


    @Override
    public ProductResponseDto getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        log.debug("Into getAllProducts service implementation");

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> productPage = productRepository.findAll(pageDetails);
        List<Product> products = productPage.getContent();

        if(products.isEmpty())
            throw new ResourceNotFoundException("products");

        List<ProductDto> productDtosList = products.stream().map(product -> modelMapper.map(product, ProductDto.class)).toList();

        return ProductResponseDto.builder()
                .products(productDtosList)
                .pageNumber(productPage.getNumber())
                .pageSize(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .isLastPage(productPage.isLast())
                .build();
    }

    @Override
    public ProductDto getProductById(Long productId) {
        log.debug("Into getProductById service implementation");

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product","productId",productId));

        return modelMapper.map(product,ProductDto.class);

    }

    @Override
    public ProductResponseDto getProductsByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        log.debug("Into getProductsByKeyword service implementation");

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> productPage = productRepository.findAllByKeyword(keyword, pageDetails);

        List<Product> products = productPage.getContent();
        if(products.isEmpty())
            throw new ResourceNotFoundException("Products","keyword",keyword);

        List<ProductDto> productsDtoList = products.stream().map(product -> modelMapper.map(product, ProductDto.class)).toList();

        return ProductResponseDto.builder()
                .products(productsDtoList)
                .pageNumber(productPage.getNumber())
                .pageSize(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .isLastPage(productPage.isLast())
                .build();

    }

    @Override
    public ProductResponseDto getProductsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        log.debug("Into getProductsByCategory service implementation");

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> productPage = productRepository.findAllByCategory(categoryId, pageDetails);

        List<Product> products = productPage.getContent();

        if(products.isEmpty())
            throw new ResourceNotFoundException("Products","category",categoryId);

        List<ProductDto> productsDtoList = products.stream().map(product -> modelMapper.map(product, ProductDto.class)).toList();

        return ProductResponseDto.builder()
                .products(productsDtoList)
                .pageNumber(productPage.getNumber())
                .pageSize(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .isLastPage(productPage.isLast())
                .build();
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

        System.out.println(productToAdd);

        if (productToAdd.isHasDiscount())
            productToAdd.setFinalPrice(calculateFinalPriceForProduct(productToAdd.getPrice(), productToAdd.getDiscount()));
        else
            productToAdd.setFinalPrice(productToAdd.getPrice());

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

    @Override
    public ProductDto updateProductImage(Long productId, MultipartFile image) throws IOException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
        String filename = fileServiceImpl.uploadImage(AppConstants.PRODUCT_IMAGES_PATH, image);
        product.setImage(filename);
        Product savedProduct = productRepository.save(product);
        return modelMapper.map(savedProduct, ProductDto.class);
    }

    private double calculateFinalPriceForProduct(double price, double discount) {
        return price - ((discount * 0.01) * price);
    }
}
