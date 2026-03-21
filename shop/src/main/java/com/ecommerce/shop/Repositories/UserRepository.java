package com.ecommerce.shop.Repositories;

import com.ecommerce.shop.Entities.User;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u where u.userName = :username ")
    Optional<User> findByUsername(@Param(value = "username") String username);

    @Query("SELECT u FROM User u where u.email = :email")
    User findByEmail(@Param(value = "email") String email);

    @Query("SELECT u FROM User u where u.userName = :username OR u.email = :email")
    User findByUsernameOrEmail(@Param(value = "username") String userName,@Param(value = "email") String email);
    
    boolean existsByUserName(@NotNull(message = "Username cannot be null") @Size(min = 6, max = 20, message = "Username must be between 6 and 20 characters") String username);

    boolean existsByEmail(@Email @NotNull(message = "Email cannot be null") String email);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = :password WHERE u.userName = :username")
    void updatePasswordByUsername(@Param("username") String username, @Param("password") String password);
}
