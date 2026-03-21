package com.ecommerce.shop.Controllers;

import com.ecommerce.shop.Config.AppEnums;
import com.ecommerce.shop.DTO.ExceptionDto;
import com.ecommerce.shop.DTO.MessageDto;
import com.ecommerce.shop.DTO.PasswordChangeDto;
import com.ecommerce.shop.DTO.RequestsDto.LoginRequestDto;
import com.ecommerce.shop.DTO.RequestsDto.UserSignupRequestDto;
import com.ecommerce.shop.DTO.ResponseDTOs.LoginResponseDto;
import com.ecommerce.shop.DTO.UserDto;
import com.ecommerce.shop.Entities.User;
import com.ecommerce.shop.Exceptions.ApiException;
import com.ecommerce.shop.Exceptions.WrongRoleException;
import com.ecommerce.shop.Repositories.UserRepository;
import com.ecommerce.shop.security.jwt.JwtUtils;
import com.ecommerce.shop.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserRepository userRepository, PasswordEncoder passwordEncoder)
    {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody LoginRequestDto loginRequestDto)
    {
        log.debug("Inside signin controller with login request {}", loginRequestDto);

        Authentication authentication;
        try{
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDto.getUsername(),
                            loginRequestDto.getPassword())
            );
        }catch (AuthenticationException e){

            ExceptionDto exceptionDto = ExceptionDto
                    .builder()
                    .message(e.getMessage())
                    .status(HttpStatus.UNAUTHORIZED.value())
                    .build();
            return new ResponseEntity<>(exceptionDto, HttpStatus.UNAUTHORIZED);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie cookie = jwtUtils.generateJwtCookie(userDetails);
        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        LoginResponseDto response = LoginResponseDto
                                        .builder()
                                        .jwtToken(cookie.getValue())
                                        .username(userDetails.getUsername())
                                        .roles(roles)
                                        .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
                        cookie.toString())
                        .body(response);


    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserSignupRequestDto userSignupRequestDto)
    {
        log.debug("Inside registerUser controller with register request {}", userSignupRequestDto);

        if(userRepository.existsByUserName(userSignupRequestDto.getUsername()))
        {
            ExceptionDto errorResponse = new ExceptionDto();
            errorResponse.setMessage("Username is already taken!");
            errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);

        }
        if(userRepository.existsByEmail((userSignupRequestDto.getEmail())))
        {
            ExceptionDto errorResponse = new ExceptionDto();
            errorResponse.setMessage("Email is already taken!");
            errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        User user = User.builder()
                .userName(userSignupRequestDto.getUsername())
                .email(userSignupRequestDto.getEmail())
                .firstName(userSignupRequestDto.getFirstname())
                .lastName(userSignupRequestDto.getLastname())
                .password(passwordEncoder.encode(userSignupRequestDto.getPassword()))
                .address(userSignupRequestDto.getAddress())
                .city(userSignupRequestDto.getCity())
                .postalCode(userSignupRequestDto.getPostalCode())
                .phoneNumber(userSignupRequestDto.getPhoneNumber())
                .build();

        String role = userSignupRequestDto.getRole();

        if(role == null) {
            user.setRole(AppEnums.UserRole.USER.toString());
        }
        else {
            if(AppEnums.UserRole.USER.toString().equalsIgnoreCase(role))
            {
                user.setRole(AppEnums.UserRole.USER.toString());
            }
            else if(AppEnums.UserRole.ADMIN.toString().equalsIgnoreCase(role))
            {
                user.setRole(AppEnums.UserRole.ADMIN.toString());
            }
            else
            {
                throw new WrongRoleException("Invalid role provided: " + role);
            }

        }

        userRepository.save(user);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/LoggedInUsername")
    public String getCurrentUsername(Authentication authentication) {

        log.debug("Inside getCurrentUsername controller");

        if(authentication != null)
        {
            return authentication.getName();
        }
        else
        {
            return "";
        }
    }


    @GetMapping("/LoggedInUser")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {

        log.debug("Inside getCurrentUser controller");

        if(authentication == null) {
            throw new NullPointerException("Authentication is null. User might not be logged in.");
        }
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();


        User userEntity = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found with username: " + userDetails.getUsername()));


        UserDto userDto = new UserDto();
        userDto.setUserId(userDetails.getId());
        userDto.setUserName(userDetails.getUsername());
        userDto.setEmail(userDetails.getEmail());
        userDto.setFirstName(userEntity.getFirstName());
        userDto.setLastName(userEntity.getLastName());
        userDto.setAddress(userEntity.getAddress());
        userDto.setCity(userEntity.getCity());
        userDto.setPostalCode(userEntity.getPostalCode());
        userDto.setPhoneNumber(userEntity.getPhoneNumber());
        userDto.setRole(userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst() // We only expect one role for the user
                .orElse(null));

        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PostMapping("/changeLoggedInUserPassword")
    public ResponseEntity<String> changeLoggedInUserPassword(Authentication authentication, @RequestBody PasswordChangeDto passwordChangeDto) {
        log.debug("Inside changeLoggedInUserPassword controller");
        if(authentication == null) throw new NullPointerException("Authentication is null.");

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        if(!passwordEncoder.matches(passwordChangeDto.getCurrentPassword(), userDetails.getPassword())) {
            return ResponseEntity.badRequest().body("Current password is incorrect");
        }

        userRepository.updatePasswordByUsername(
                userDetails.getUsername(),
                passwordEncoder.encode(passwordChangeDto.getNewPassword())
        );

        return ResponseEntity.ok("User password changed successfully!");
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signoutUser(){
        log.debug("Inside signoutUser controller");

        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageDto("User has been signed out"));
    }
}
