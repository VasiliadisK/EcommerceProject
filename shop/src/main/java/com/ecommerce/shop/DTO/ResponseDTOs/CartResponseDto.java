package com.ecommerce.shop.DTO.ResponseDTOs;

import com.ecommerce.shop.DTO.ProductDto;
import com.ecommerce.shop.DTO.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponseDto {

    private Long cartId;
    private UserDto user;
    private List<ProductDto> productsList;
    private Double totalPrice;

}
