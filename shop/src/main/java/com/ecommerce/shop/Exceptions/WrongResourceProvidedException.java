package com.ecommerce.shop.Exceptions;

public class WrongResourceProvidedException extends RuntimeException {
    String resourceName;
    String field;
    String fieldName;
    Long fieldId;

    public WrongResourceProvidedException(String resourceName){
        super(String.format("Invalid %s provided", resourceName));
    }
    public WrongResourceProvidedException(String resourceName, String fieldName) {
        super(String.format("Invalid %s provided with value: %s ", resourceName, fieldName));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldName = fieldName;
    }

    public WrongResourceProvidedException(String resourceName, Long fieldId) {
        super(String.format("Invalid %s provided with value: %s", resourceName, fieldId));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldId = fieldId;
    }
}
