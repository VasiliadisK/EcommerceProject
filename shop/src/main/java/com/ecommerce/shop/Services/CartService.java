package com.ecommerce.shop.Services;

import com.ecommerce.shop.DTO.ResponseDTOs.CartResponseDto;

import java.util.List;

public interface CartService {

    CartResponseDto addProductToCart(Long productId, Integer quantity);

    List<CartResponseDto> getAllCarts();

    CartResponseDto getCartByCartId(Long cartId);

    CartResponseDto getLoggedInUserCart();

    CartResponseDto updateProductQuantity(Long productId, Integer quantity);

    String deleteProduct(Long productId);

    String clearCart();
}
