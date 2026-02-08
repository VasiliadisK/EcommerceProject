package com.ecommerce.shop.util;

import org.springframework.stereotype.Component;

@Component
public class productsUtil {

    public static double calculateFinalPriceForProduct(double price, double discount) {
        return price - ((discount * 0.01) * price);
    }
}
