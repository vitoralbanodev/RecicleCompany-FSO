package com.recicleltda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recicleltda.entities.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
}
