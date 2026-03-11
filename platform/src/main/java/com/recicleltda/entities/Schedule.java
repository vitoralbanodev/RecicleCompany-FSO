package com.recicleltda.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message="Nome é obrigatório")
    private String name;
    
    @Email(message="Email inválido")
    @NotBlank(message="Email é obrigatório")
    private String email;

    @NotBlank(message="Telefone é obrigatório")
    private String phone;
    
    @NotBlank(message="Endereço é obrigatório")
    private String address;

    private Date date;
    
    @NotBlank(message="Hora é obrigatória")
    private String time;

    @ElementCollection
    private List<String> materials;
    
    private String observations;
}
