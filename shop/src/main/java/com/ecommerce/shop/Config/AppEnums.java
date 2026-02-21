package com.ecommerce.shop.Config;

public class AppEnums {

    public enum UserRole {
        ADMIN,
        USER
    }

    public enum OrderStatus {
        PREPARING,
        SHIPPING,
        COMPLETED,
        REFUNDED,
        CANCELLED
    }

    public enum PaymentStatus {
        PENDING,
        COMPLETED,
        FAILED
    }

    public enum PaymentMethod {
        STRIPE,
        PAYPAL,
        CARD
    }

}
