package com.ecommerce.shop.Exceptions;

import com.ecommerce.shop.DTO.ExceptionDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ExceptionDto> myAPIException(ApiException e) {
        String message = e.getMessage();
        ExceptionDto exceptionDto = new ExceptionDto(message,HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(exceptionDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionDto> myResourceNotFoundException(ResourceNotFoundException e) {
        String message = e.getMessage();
        ExceptionDto apiResponse = new ExceptionDto(message, HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }
}
