package com.ecommerce.shop.Exceptions;

public class ApiException extends RuntimeException {
    public ApiException() {
    }

    public ApiException(String message) {
        super(message);
    }
}
