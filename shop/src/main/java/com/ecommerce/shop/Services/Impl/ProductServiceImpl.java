package com.ecommerce.shop.Services.Impl;

import com.ecommerce.shop.Config.AppConstants;
import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.DTO.ResponseDTOs.ProductResponseDto;
import com.ecommerce.shop.Entities.Cart;
import com.ecommerce.shop.Entities.CartProduct;
import com.ecommerce.shop.Entities.Category;
import com.ecommerce.shop.Entities.Product;
import com.ecommerce.shop.Exceptions.ResourceAlreadyExistsException;
import com.ecommerce.shop.Exceptions.ResourceNotFoundException;
import com.ecommerce.shop.Repositories.CartProductRepository;
import com.ecommerce.shop.Repositories.CartRepository;
import com.ecommerce.shop.Repositories.CategoryRepository;
import com.ecommerce.shop.Repositories.ProductRepository;
import com.ecommerce.shop.DTO.RequestsDto.ProductRequestDto;
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

import java.io.IOException;
import java.util.List;
import java.util.Objects;

import static com.ecommerce.shop.util.productsUtil.calculateFinalPriceForProduct;


@Service
@Slf4j
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final CategoryRepository categoryRepository;
    private final FileServiceImpl fileServiceImpl;
    private final CartRepository cartRepository;
    private final CartProductRepository cartProductRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, ModelMapper modelMapper, CategoryRepository categoryRepository, FileServiceImpl fileServiceImpl, CartProductRepository cartProductRepository, CartRepository cartRepository, CartProductRepository cartProductRepository1)
    {
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
        this.categoryRepository = categoryRepository;
        this.fileServiceImpl = fileServiceImpl;
        this.cartRepository = cartRepository;
        this.cartProductRepository = cartProductRepository1;
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
    public ProductDto addProduct(Long categoryId, ProductRequestDto productRequest) {
        log.debug("Into addProduct service implementation");

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category","categoryId",categoryId));

        if (productRepository.existsByProductName(productRequest.getProductName())) {
            throw new ResourceAlreadyExistsException("Product", "name", productRequest.getProductName());
        }

        Product productToAdd = getProductEntity(productRequest, category);
        // I need to also be able to add multiple products at once
        //hence the save is out of the get product method
        Product addedProduct = productRepository.save(productToAdd);
        log.info("Added product: {}", addedProduct);
        return modelMapper.map(addedProduct, ProductDto.class);

    }

    @Override
    public List<ProductDto> addMultipleProducts(Long categoryId, List<ProductRequestDto> productsRequest) {
        log.debug("Into addMultipleProducts service implementation");

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        List<String> productNames = productsRequest.stream()
                .map(ProductRequestDto::getProductName)
                .toList();

        List<String> existingProductNames = productRepository
                .findExistingProductsByName(productNames)
                .stream()
                .map(Product::getProductName)
                .toList();

        List<Product> productsToAdd = productsRequest.stream()
                .filter(dto -> !existingProductNames.contains(dto.getProductName()))
                .map(dto -> getProductEntity(dto, category))
                .toList();

        if (productsToAdd.isEmpty()) {
            throw new ResourceAlreadyExistsException("Products", productNames);
        }

        List<Product> savedProducts = productRepository.saveAll(productsToAdd);
        log.info("Added {} products: {}", savedProducts.size(),
                 savedProducts.stream().map(Product::getProductName).toList());

        return savedProducts.stream()
                .map(p -> modelMapper.map(p, ProductDto.class))
                .toList();
    }

    private Product getProductEntity(ProductRequestDto productRequest, Category category) {
        Product productToAdd = modelMapper.map(productRequest, Product.class);
        productToAdd.setCategory(category);
        if (productToAdd.isHasDiscount())
            productToAdd.setFinalPrice(calculateFinalPriceForProduct(productToAdd.getPrice(), productToAdd.getDiscount()));
        else
            productToAdd.setFinalPrice(productToAdd.getPrice());
        return productToAdd;
    }

    @Override
    public ProductDto updateProduct(Long productId, ProductRequestDto productRequestDto) {
        Product productFromDb = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        Product product = modelMapper.map(productRequestDto, Product.class);

        productFromDb.setProductName(product.getProductName());
        productFromDb.setDescription(product.getDescription());
        productFromDb.setAvailableQuantity(product.getAvailableQuantity());
        productFromDb.setHasDiscount(product.isHasDiscount());
        productFromDb.setDiscount(product.getDiscount());
        productFromDb.setPrice(product.getPrice());
        if(productFromDb.isHasDiscount())
            productFromDb.setFinalPrice(calculateFinalPriceForProduct(productFromDb.getPrice(), productFromDb.getDiscount()));
        else
            productFromDb.setFinalPrice(productFromDb.getPrice());
        Product savedProduct = productRepository.save(productFromDb);

        List<CartProduct> cartProducts = cartProductRepository
            .findAllByProductId(productId);
        if (!cartProducts.isEmpty()) {
            cartProducts.forEach(cp -> {
                cp.setProductPrice(productFromDb.getFinalPrice());
                cp.setProduct(productFromDb);
                cp.setDiscount(productFromDb.getDiscount());
            });
            cartProductRepository.saveAll(cartProducts);

            List<Cart> affectedCarts = cartProducts.stream()
                    .map(CartProduct::getCart)
                    .toList();
            affectedCarts.forEach(this::recalculateTotalPriceOfCart);
        }
        return modelMapper.map(savedProduct, ProductDto.class);
    }

    private void recalculateTotalPriceOfCart(Cart cart) {
        log.debug("Into recalculateTotalPriceOfCart for cart id {}",cart.getCartId());
        double totalPrice = cart.getCartItems().stream()
                .mapToDouble(cp -> cp.getRequestedQuantity() * cp.getProductPrice())
                .sum();
        cart.setTotalPrice(totalPrice);
        cartRepository.save(cart);
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
}
