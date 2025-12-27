package com.ecommerce.shop.Services.Impl;

import com.ecommerce.shop.Config.AppEnums;
import com.ecommerce.shop.DTO.RequestsDto.UserRequestDto;
import com.ecommerce.shop.DTO.ResponseDTOs.UserResponseDto;
import com.ecommerce.shop.DTO.UserDto;
import com.ecommerce.shop.Entities.User;
import com.ecommerce.shop.Exceptions.ResourceAlreadyExistsException;
import com.ecommerce.shop.Exceptions.ResourceNotFoundException;
import com.ecommerce.shop.Exceptions.WrongResourceProvidedException;
import com.ecommerce.shop.Repositories.UserRepository;
import com.ecommerce.shop.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper)
    {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;

    }

    @Override
    public UserResponseDto getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        log.debug("Inside getAllUsers service implementation");
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<User> users = userRepository.findAll(pageDetails);
        List<User> userList = users.getContent();
        if(userList.isEmpty())
            throw new ResourceNotFoundException("Users");
        List<UserDto> usersToDto = userList.stream().map(user -> modelMapper.map(user, UserDto.class)).toList();

        return UserResponseDto
                .builder()
                .users(usersToDto)
                .pageNumber(users.getNumber())
                .pageSize(users.getSize())
                .totalElements(users.getTotalElements())
                .totalPages(users.getTotalPages())
                .isLastPage(users.isLast())
                .build();
    }

    @Override
    public UserDto getUserById(Long userId) {
        log.debug("Inside getUserById service implementation with userId {}",userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return modelMapper.map(user , UserDto.class);
    }

    @Override
    public UserDto getUserByUsername(String username) {
        log.debug("Inside getUserByUsername service implementation with username {}",username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        return modelMapper.map(user , UserDto.class);
    }

    @Override
    public UserDto addUser(UserRequestDto userRequest) {
        log.debug("Inside addUser for user {}",userRequest.getUserName());
        User existingUser = userRepository.findByUsernameOrEmail(userRequest.getUserName(),userRequest.getEmail());

        if(existingUser != null)
            throw new ResourceAlreadyExistsException("User","username or email",userRequest.getUserName()+" - "+userRequest.getEmail());

        User userToBeAdded = modelMapper.map(userRequest, User.class);

        //TO-DO MAKE THE PASSWORD ENCODED BEFORE SAVING IT INTO THE DB
        //USING BCRYPT PasswordEncoder bean method inside the SecurityConfig class
        if(userRequest.getRole() == null) {
            userToBeAdded.setRole(AppEnums.UserRole.USER.toString());
        }else {
            if(userRequest.getRole().equalsIgnoreCase(AppEnums.UserRole.ADMIN.toString()))
                userToBeAdded.setRole(AppEnums.UserRole.ADMIN.toString());
            else if(userRequest.getRole().equalsIgnoreCase(AppEnums.UserRole.USER.toString()))
                userToBeAdded.setRole(AppEnums.UserRole.USER.toString());
            else
                throw new WrongResourceProvidedException("Role" ,userRequest.getRole());
        }

        User savedUser = userRepository.save(userToBeAdded);
        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public UserDto updateUser(Long userId, UserRequestDto userRequestDto) {

        User userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        userEntity.setFirstName(userRequestDto.getFirstName());
        userEntity.setLastName(userRequestDto.getLastName());
        userEntity.setUserName(userRequestDto.getUserName());
        userEntity.setEmail(userRequestDto.getEmail());
//        userEntity.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        //TEMPORARY SHOULD BE ADAPTED TO HASH PASSWORD
        userEntity.setPassword(userRequestDto.getPassword());
        userEntity.setAddress(userRequestDto.getAddress());
        if(userRequestDto.getRole() != null) {
            if(AppEnums.UserRole.USER.toString().equalsIgnoreCase(userRequestDto.getRole())) {
                userEntity.setRole(AppEnums.UserRole.USER.toString());
            } else if(AppEnums.UserRole.ADMIN.toString().equalsIgnoreCase(userRequestDto.getRole())) {
                userEntity.setRole(AppEnums.UserRole.ADMIN.toString());
            } else {
                throw new WrongResourceProvidedException("Role" ,userRequestDto.getRole());
            }
        }

        User updatedUser = userRepository.save(userEntity);
        return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    public UserDto deleteUser(Long userId) {

        User userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId",userId));
        userRepository.delete(userEntity);
        return modelMapper.map(userEntity, UserDto.class);
    }
}
