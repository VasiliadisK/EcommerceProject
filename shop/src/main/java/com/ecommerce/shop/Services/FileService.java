package com.ecommerce.shop.Services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    String uploadImage(String productImagesPath, MultipartFile image) throws IOException;
}
