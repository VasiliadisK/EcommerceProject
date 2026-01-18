package com.ecommerce.shop.DTO.ResponseDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserSignupResponseDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String role;
    private String address;
}
