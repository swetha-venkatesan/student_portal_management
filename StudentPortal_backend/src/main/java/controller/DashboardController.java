package controller;

import org.springframework.web.bind.annotation.*;

import service.StudentService;
import service.CourseService;
import service.EnrollmentService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    private final StudentService studentService;
    private final CourseService courseService;
    private final EnrollmentService enrollmentService;

    public DashboardController(StudentService studentService, CourseService courseService, EnrollmentService enrollmentService) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", studentService.getAllStudents().size());
        stats.put("totalCourses", courseService.getAllCourses().size());
        stats.put("totalEnrollments", enrollmentService.getAllEnrollments().size());
        return stats;
    }
}