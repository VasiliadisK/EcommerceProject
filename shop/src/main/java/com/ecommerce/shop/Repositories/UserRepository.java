package com.ecommerce.shop.Repositories;

import com.ecommerce.shop.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u where u.userName = :username ")
    Optional<User> findByUsername(@Param(value = "username") String username);

    @Query("SELECT u FROM User u where u.userName = :username OR u.email = :email")
    User findByUsernameOrEmail(@Param(value = "username") String userName,@Param(value = "email") String email);
}
