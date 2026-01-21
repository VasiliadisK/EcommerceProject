package com.ecommerce.shop.Exceptions;

import java.util.List;

public class ResourceAlreadyExistsException extends RuntimeException {

    String resourceName;
    String field;
    String fieldName;
    Long fieldId;

    public ResourceAlreadyExistsException(String resourceName){
        super(String.format("%s already exist", resourceName));
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

    public ResourceAlreadyExistsException(String resourceName, List<String> fieldNames) {
        super(String.format("All %s already exist: %s",
                resourceName,
                String.join(", ", fieldNames)));
    }
}
