package com.recicleltda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recicleltda.entities.Complaint;
import com.recicleltda.repositories.ComplaintRepository;

@RestController
@RequestMapping("/api/complaint")
@CrossOrigin(origins = "*")
public class ComplaintController {
    
    @Autowired
    private ComplaintRepository complaintRepository;
    
    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        String protocol = "DEN-" + java.time.Year.now().getValue() + "-" + 
                         String.format("%03d", (int)(Math.random() * 1000));
        complaint.setProtocol(protocol);
        complaint.setStatus("pending");
        
        return complaintRepository.save(complaint);
    }
}
