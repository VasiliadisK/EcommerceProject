package com.ecommerce.shop.Exceptions;

public class WrongRoleException extends RuntimeException {
    public static final long serialVersionUID = 1L;

    public WrongRoleException(String message) {
        super(message);
    }
}
