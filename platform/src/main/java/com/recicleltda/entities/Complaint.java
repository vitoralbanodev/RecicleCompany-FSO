package com.recicleltda.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message="Tipo da denúncia é obrigatório")
    private String type;
    
    @NotBlank(message="Descrição é obrigatória")
    private String description;

    @NotBlank(message="Localização é obrigatória")
    private String location;

    private Date date;
    private String time;

    @ElementCollection
    @Column(columnDefinition = "TEXT")
    private List<String> photos;
    
    private boolean anonymous;
    
    private String name;
    private String email;
    private String phone;
    
    private String protocol;
    private String status = "pending";
}
