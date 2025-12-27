package com.ecommerce.shop.Services.Impl;

import com.ecommerce.shop.Services.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {
    @Override
    public String uploadImage(String productImagesPath, MultipartFile image) throws IOException {
        String originalFileName = image.getOriginalFilename();
        String randomId = UUID.randomUUID().toString();
        String fileName = randomId.concat(originalFileName.substring(originalFileName.lastIndexOf('.')));
        String filePath = productImagesPath + File.separator + fileName;
        File folder = new File(productImagesPath);
        if (!folder.exists())
        {
            folder.mkdir();
        }

        Files.copy(image.getInputStream(), Paths.get(filePath));
        return fileName;
    }
}
