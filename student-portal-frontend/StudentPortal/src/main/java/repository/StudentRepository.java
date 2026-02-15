package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}





//package repository;
//
//
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import model.Student;
//
//public interface StudentRepository extends JpaRepository<Student, Long> {
//}
