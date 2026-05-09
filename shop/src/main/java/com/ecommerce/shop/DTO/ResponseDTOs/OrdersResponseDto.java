package com.ecommerce.shop.DTO.ResponseDTOs;


import com.ecommerce.shop.DTO.OrderDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrdersResponseDto {
    List<OrderDto> orders;
    private Integer pageNumber;
    private Integer pageSize;
    private Long totalElements;
    private Integer totalPages;
    private boolean isLastPage;
}
