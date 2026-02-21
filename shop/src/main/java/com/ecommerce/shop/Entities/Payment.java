package com.ecommerce.shop.Entities;

import com.ecommerce.shop.Config.AppEnums.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "Payments")
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;
    @OneToOne(mappedBy = "payment", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Order order;
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;
    private String pgPaymentId;
    private String pgStatus;
    private String pgResponseMessage;
    private String pgName;

    public Payment(PaymentMethod paymentMethod, String pgPaymentId, String pgStatus, String pgResponseMessage, String pgName){
        this.paymentMethod = paymentMethod;
        this.pgPaymentId = pgPaymentId;
        this.pgStatus = pgStatus;
        this.pgResponseMessage = pgResponseMessage;
        this.pgName = pgName;
    }
}