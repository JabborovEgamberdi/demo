package com.example.demo.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("" +
            "select case when count(s) > 0 " +
            "then true else false end " +
            "from student as s " +
            "where s.email = :email")
    Boolean selectExistsEmail(@Param("email") String email);

}
