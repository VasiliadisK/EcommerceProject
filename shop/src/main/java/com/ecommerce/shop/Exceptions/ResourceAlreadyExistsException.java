package com.ecommerce.shop.Exceptions;

public class ResourceAlreadyExistsException extends RuntimeException {

    String resourceName;
    String field;
    String fieldName;
    Long fieldId;

    public ResourceAlreadyExistsException(String resourceName){
        super(String.format("%s already exist"));
    }
    public ResourceAlreadyExistsException(String resourceName, String field, String fieldName) {
        super(String.format("%s with %s: %s already exists", resourceName, field, fieldName));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldName = fieldName;
    }

    public ResourceAlreadyExistsException(String resourceName, String field, Long fieldId) {
        super(String.format("%s with %s: %d already exists", resourceName, field, fieldId));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldId = fieldId;
    }

}
