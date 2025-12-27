package com.ecommerce.shop.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @NotBlank(message = "firstname is required")
    @Column(name = "firstName")
    private String firstName;

    @NotBlank(message = "lastName is required")
    @Column(name = "lastName")
    private String lastName;

    @NotBlank(message = "userName is required")
    @Size(min = 6, max=20, message = "Username must be between 6 and 20 characters")
    @Column(name = "userName")
    private String userName;

    @NotBlank(message = "email is required")
    @Email(message = "Invalid email format")
    @Column(name = "email")
    private String email;

    @NotBlank(message = "password is required")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    @Column(name = "password")
    private String password;

    @NotBlank(message = "address is required")
    @Column(name = "address")
    private String address;

    @NotBlank(message = "role is required")
    @Column(name = "role")
    private String role;
}
