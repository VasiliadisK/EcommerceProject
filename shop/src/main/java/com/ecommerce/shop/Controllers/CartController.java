package com.ecommerce.shop.Controllers;

import com.ecommerce.shop.DTO.ResponseDTOs.CartResponseDto;
import com.ecommerce.shop.Services.CartService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class CartController {

    private CartService cartService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/carts")
    public ResponseEntity<List<CartResponseDto>> getAllCarts(){
        log.debug("Inside getAllCarts controller");

        List<CartResponseDto> carts = cartService.getAllCarts();
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/carts/{cartId}")
    public ResponseEntity<CartResponseDto> getCartByCartId(@PathVariable Long cartId){
        log.debug("Inside getCartByCartId controller with cart id {}", cartId);

        CartResponseDto cart = cartService.getCartByCartId(cartId);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/carts/users/cart")
    public ResponseEntity<CartResponseDto> getUserCart(){
        log.debug("Inside getUserCart controller");

        CartResponseDto cart = cartService.getLoggedInUserCart();
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PostMapping("/carts/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartResponseDto> addProductToCart(@PathVariable Long productId,
                                                            @PathVariable Integer quantity){
        log.debug("Inside addProductToCart controller with productId {} and quantity {}",productId, quantity);

        CartResponseDto updatedCart = cartService.addProductToCart(productId, quantity);
        return new ResponseEntity<>(updatedCart, HttpStatus.OK);
    }

    @PutMapping("/cart/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartResponseDto> updateProductQuantityInCart(@PathVariable Long productId,
                                                                       @PathVariable Integer quantity){
        log.debug("Inside updateProductQuantityInCart controller for productId {}", productId);

        CartResponseDto updatedCart = cartService.updateProductQuantity(productId, quantity);
        return new ResponseEntity<>(updatedCart, HttpStatus.OK);
    }

    @DeleteMapping("/carts/userCart/product/{productId}")
    public ResponseEntity<String> deleteProductFromCart(@PathVariable Long productId){
        log.debug("Inside deleteProductFromCart controller for product {}", productId);
        return new ResponseEntity<>(cartService.deleteProduct(productId),HttpStatus.OK);
    }

    @PostMapping("/carts/userCart/clearCart")
    public ResponseEntity<String> clearCartOfLoggedInUser(){
        log.debug("Inside clearCartOfLoggedInUser controller");
        return new ResponseEntity<>(cartService.clearCart(), HttpStatus.OK);
    }
}
