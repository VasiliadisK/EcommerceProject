package com.ecommerce.shop.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    // this config method is used to allow our frontend to "find" the images that we are storing in our backend
    // its pretty much saying "If you get a request with this path /images/** then you have to look into the file at images/ to get your image"
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**").addResourceLocations("file:images/");
    }
}
