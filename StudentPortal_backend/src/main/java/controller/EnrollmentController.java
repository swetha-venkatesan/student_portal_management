package controller;

import org.springframework.web.bind.annotation.*;

import model.Enrollment;
import service.EnrollmentService;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrollmentController {

    private final EnrollmentService service;

    public EnrollmentController(EnrollmentService service) {
        this.service = service;
    }

    @PostMapping
    public Enrollment enrollStudent(@RequestBody Enrollment enrollment) {
        return service.enrollStudent(enrollment);
    }

    @GetMapping("/student/{studentId}")
    public List<Enrollment> getStudentEnrollments(@PathVariable Long studentId) {
        return service.getStudentEnrollments(studentId);
    }

    @GetMapping("/course/{courseId}")
    public List<Enrollment> getCourseEnrollments(@PathVariable Long courseId) {
        return service.getCourseEnrollments(courseId);
    }

    @PutMapping("/{id}/grade")
    public Enrollment updateGrade(@PathVariable Long id, @RequestBody String grade) {
        return service.updateGrade(id, grade);
    }

    @DeleteMapping("/{id}")
    public void dropEnrollment(@PathVariable Long id) {
        service.dropEnrollment(id);
    }
}