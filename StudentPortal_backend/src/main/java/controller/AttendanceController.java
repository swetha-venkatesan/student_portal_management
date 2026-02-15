package controller;

import org.springframework.web.bind.annotation.*;

import model.Attendance;
import service.AttendanceService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    @PostMapping
    public Attendance markAttendance(@RequestBody Attendance attendance) {
        return service.markAttendance(attendance);
    }

    @GetMapping("/student/{studentId}")
    public List<Attendance> getStudentAttendance(@PathVariable Long studentId) {
        return service.getStudentAttendance(studentId);
    }

    @GetMapping("/course/{courseId}")
    public List<Attendance> getCourseAttendance(@PathVariable Long courseId) {
        return service.getCourseAttendance(courseId);
    }

    @GetMapping("/stats/{studentId}")
    public Map<String, Long> getAttendanceStats(@PathVariable Long studentId) {
        return service.getAttendanceStats(studentId);
    }

    @GetMapping("/percentage/{studentId}/{courseId}")
    public double getAttendancePercentage(@PathVariable Long studentId, @PathVariable Long courseId) {
        return service.getAttendancePercentage(studentId, courseId);
    }
}