package com.ecommerce.shop.DTO.RequestsDto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupRequestDto {

    @NotNull(message = "First name cannot be null")
    @Size(max = 30, message = "First name must be up to 30 characters")
    @Column(name = "first_name", nullable = false)
    private String firstname;

    @NotNull(message = "Last name cannot be null")
    @Size(max = 30, message = "Last name must be up to 30 characters")
    @Column(name = "last_name", nullable = false)
    private String lastname;

    @Email
    @NotNull(message = "Email cannot be null")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull(message = "Username cannot be null")
    @Size(min = 6, max = 20, message = "Username must be between 6 and 20 characters")
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    private String password;

    @NotNull(message = "Address cannot be null")
    @Column(name = "address", nullable = false)
    private String address;

    @NotBlank(message = "City cannot be null")
    private String city;

    @NotBlank(message = "Postal code cannot be null")
    private String postalCode;

    @NotBlank(message = "Phone number cannot be null")
    private String phoneNumber;

    @Column(name = "role", nullable = false)
    private String role;


}