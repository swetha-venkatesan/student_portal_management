package service;

import org.springframework.stereotype.Service;

import model.Attendance;
import repository.AttendanceRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    private final AttendanceRepository repository;

    public AttendanceService(AttendanceRepository repository) {
        this.repository = repository;
    }

    public Attendance markAttendance(Attendance attendance) {
        attendance.setDate(LocalDate.now());
        return repository.save(attendance);
    }

    public List<Attendance> getStudentAttendance(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public List<Attendance> getCourseAttendance(Long courseId) {
        return repository.findByCourseId(courseId);
    }

    public Map<String, Long> getAttendanceStats(Long studentId) {
        List<Attendance> records = repository.findByStudentId(studentId);
        return records.stream()
                .collect(Collectors.groupingBy(Attendance::getStatus, Collectors.counting()));
    }

    public double getAttendancePercentage(Long studentId, Long courseId) {
        List<Attendance> records = repository.findByStudentIdAndCourseId(studentId, courseId);
        if (records.isEmpty()) return 0;
        
        long present = records.stream().filter(a -> "PRESENT".equals(a.getStatus())).count();
        return (present * 100.0) / records.size();
    }
}