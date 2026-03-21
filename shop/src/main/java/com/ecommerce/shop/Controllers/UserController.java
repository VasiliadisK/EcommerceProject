package com.ecommerce.shop.Controllers;

import com.ecommerce.shop.Config.AppConstants;
import com.ecommerce.shop.DTO.RequestsDto.UserRequestDto;
import com.ecommerce.shop.DTO.ResponseDTOs.UserResponseDto;
import com.ecommerce.shop.DTO.UserDto;
import com.ecommerce.shop.Services.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class UserController
{
    private UserService userService;
    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/users")
    public ResponseEntity<UserResponseDto> getAllUsers(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_USERS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ){
        log.debug("Inside getAllUsers controller");
        UserResponseDto users = userService.getAllUsers(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/users/id/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId)
    {
        log.debug("Inside getUserById controller with userId {}", userId);
        UserDto user = userService.getUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/users/username")
    public ResponseEntity<UserDto> getUserByUsername(@RequestParam String username)
    {
        log.debug("Inside getUserByUsername controller with username {}", username);
        UserDto user = userService.getUserByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/users")
    public ResponseEntity<UserDto> addUser(@Valid @RequestBody UserRequestDto userRequest)
    {
        log.debug("Inside addUser controller for user  {}", userRequest.getUserName());
        UserDto user = userService.addUser(userRequest);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @PutMapping("/users/{userId}")
    public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserRequestDto userRequestDto,
                                              @PathVariable Long userId){
        log.debug("Inside updateUser controller for user  {}", userRequestDto.getUserName());

        UserDto updatedUserDto = userService.updateUser(userId, userRequestDto);
        return new ResponseEntity<>(updatedUserDto, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/users/{userId}")
    public ResponseEntity<UserDto> deleteProduct(@PathVariable Long userId){
        log.debug("Inside deleteProduct controller for user  {}", userId);

        UserDto deletedUser = userService.deleteUser(userId);
        return new ResponseEntity<>(deletedUser, HttpStatus.OK);
    }

}
