package com.recicleltda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recicleltda.entities.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
}
