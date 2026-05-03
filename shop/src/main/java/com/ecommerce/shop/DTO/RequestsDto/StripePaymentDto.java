package com.ecommerce.shop.DTO.RequestsDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StripePaymentDto {
    private String currency;
    private Long amount;
}
