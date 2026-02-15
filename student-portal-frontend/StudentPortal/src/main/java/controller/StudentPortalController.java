package controller;

import org.springframework.web.bind.annotation.*;

import model.Student;
import model.Attendance;
import model.Enrollment;
import model.Timetable;
import service.StudentService;
import service.AttendanceService;
import service.FeeService;
import service.EnrollmentService;
import service.TimetableService;
import service.CourseService;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student-portal")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentPortalController {

    private final StudentService studentService;
    private final AttendanceService attendanceService;
    private final FeeService feeService;
    private final EnrollmentService enrollmentService;
    private final TimetableService timetableService;
    private final CourseService courseService;

    public StudentPortalController(
        StudentService studentService,
        AttendanceService attendanceService,
        FeeService feeService,
        EnrollmentService enrollmentService,
        TimetableService timetableService,
        CourseService courseService
    ) {
        this.studentService = studentService;
        this.attendanceService = attendanceService;
        this.feeService = feeService;
        this.enrollmentService = enrollmentService;
        this.timetableService = timetableService;
        this.courseService = courseService;
    }

    // Get student profile
    @GetMapping("/profile/{studentId}")
    public Student getProfile(@PathVariable Long studentId) {
        return studentService.getStudentById(studentId);
    }

    // Get student attendance
    @GetMapping("/attendance/{studentId}")
    public List<Attendance> getMyAttendance(@PathVariable Long studentId) {
        return attendanceService.getStudentAttendance(studentId);
    }

    // Get student fees
    @GetMapping("/fees/{studentId}")
    public Map<String, Object> getMyFees(@PathVariable Long studentId) {
        return feeService.getStudentFeesSummary(studentId);
    }

    // Get student enrollments with course details
    @GetMapping("/enrollments/{studentId}")
    public List<Map<String, Object>> getMyEnrollments(@PathVariable Long studentId) {
        List<Enrollment> enrollments = enrollmentService.getStudentEnrollments(studentId);
        
        return enrollments.stream().map(enrollment -> {
            Map<String, Object> enrollmentData = new HashMap<>();
            enrollmentData.put("id", enrollment.getId());
            enrollmentData.put("courseId", enrollment.getCourseId());
            enrollmentData.put("status", enrollment.getStatus());
            enrollmentData.put("grade", enrollment.getGrade());
            
            // Get course details
            var course = courseService.getCourseById(enrollment.getCourseId());
            if (course != null) {
                enrollmentData.put("courseName", course.getCourseName());
                enrollmentData.put("courseCode", course.getCourseCode());
                enrollmentData.put("instructor", course.getInstructor());
                enrollmentData.put("credits", course.getCredits());
            }
            
            return enrollmentData;
        }).collect(Collectors.toList());
    }

    // Get student timetable
    @GetMapping("/timetable/{studentId}")
    public List<Map<String, Object>> getMyTimetable(@PathVariable Long studentId) {
        List<Enrollment> enrollments = enrollmentService.getStudentEnrollments(studentId);
        
        return enrollments.stream()
            .flatMap(enrollment -> {
                List<Timetable> schedules = timetableService.getCourseSchedule(enrollment.getCourseId());
                return schedules.stream().map(schedule -> {
                    Map<String, Object> scheduleData = new HashMap<>();
                    scheduleData.put("id", schedule.getId());
                    scheduleData.put("dayOfWeek", schedule.getDayOfWeek());
                    scheduleData.put("startTime", schedule.getStartTime());
                    scheduleData.put("endTime", schedule.getEndTime());
                    scheduleData.put("room", schedule.getRoom());
                    
                    var course = courseService.getCourseById(enrollment.getCourseId());
                    if (course != null) {
                        scheduleData.put("courseName", course.getCourseName());
                        scheduleData.put("courseCode", course.getCourseCode());
                        scheduleData.put("instructor", course.getInstructor());
                    }
                    
                    return scheduleData;
                });
            })
            .collect(Collectors.toList());
    }

    // Update student profile
    @PutMapping("/profile/{studentId}")
    public Student updateProfile(@PathVariable Long studentId, @RequestBody Student student) {
        student.setId(studentId);
        return studentService.updateStudent(student);
    }
}