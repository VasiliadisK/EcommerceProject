package com.ecommerce.shop.DTO.RequestsDto;

import com.ecommerce.shop.Config.AppEnums.*;
import com.ecommerce.shop.Entities.CartProduct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {
    private Long userId;
    private String email;
    private String Address;
    private List<CartProduct> cartItems;
    private PaymentMethod paymentMethod;
    private String pgName;
    private String pgPaymentId;
    private String pgStatus;
    private String pgResponseMessage;

}
