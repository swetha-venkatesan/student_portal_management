package controller;

import org.springframework.web.bind.annotation.*;

import model.Student;
import service.StudentService;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return service.addStudent(student);
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable Long id) {
        return service.getStudentById(id);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        student.setId(id);
        return service.updateStudent(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
    }

    @GetMapping("/search")
    public List<Student> searchStudents(@RequestParam String keyword) {
        return service.searchStudents(keyword);
    }
}








































//package controller;




//
//import org.springframework.web.bind.annotation.*;
//
//import model.Student;
//import service.StudentService;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/students")
//@CrossOrigin(origins = "http://localhost:3000")
//public class StudentController {
//
//    private final StudentService service;
//
//    public StudentController(StudentService service) {
//        this.service = service;
//    }
//
//    @GetMapping
//    public List<Student> getAllStudents() {
//        return service.getAllStudents();
//    }
//
//    @PostMapping
//    public Student addStudent(@RequestBody Student student) {
//        return service.addStudent(student);
//    }
//
//    @GetMapping("/{id}")
//    public Student getStudent(@PathVariable Long id) {
//        return service.getStudentById(id);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteStudent(@PathVariable Long id) {
//        service.deleteStudent(id);
//    }
//}
