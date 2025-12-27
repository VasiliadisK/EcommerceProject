package com.ecommerce.shop.Services;

import com.ecommerce.shop.DTO.RequestsDto.UserRequestDto;
import com.ecommerce.shop.DTO.ResponseDTOs.UserResponseDto;
import com.ecommerce.shop.DTO.UserDto;
import jakarta.validation.Valid;

public interface UserService {
    UserResponseDto getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    UserDto getUserById(Long userId);

    UserDto getUserByUsername(String username);

    UserDto addUser(@Valid UserRequestDto userRequest);

    UserDto updateUser(Long userId, @Valid UserRequestDto userRequestDto);

    UserDto deleteUser(Long userId);
}
