package service;

import org.springframework.stereotype.Service;

import model.Enrollment;
import repository.EnrollmentRepository;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository repository;

    public EnrollmentService(EnrollmentRepository repository) {
        this.repository = repository;
    }

    public List<Enrollment> getAllEnrollments() {
        return repository.findAll();
    }

    public Enrollment enrollStudent(Enrollment enrollment) {
        enrollment.setStatus("ENROLLED");
        return repository.save(enrollment);
    }

    public List<Enrollment> getStudentEnrollments(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public List<Enrollment> getCourseEnrollments(Long courseId) {
        return repository.findByCourseId(courseId);
    }

    public Enrollment updateGrade(Long enrollmentId, String grade) {
        Enrollment enrollment = repository.findById(enrollmentId).orElse(null);
        if (enrollment != null) {
            enrollment.setGrade(grade);
            return repository.save(enrollment);
        }
        return null;
    }

    public void dropEnrollment(Long enrollmentId) {
        repository.deleteById(enrollmentId);
    }
}

















//
//package service;
//
//import org.springframework.stereotype.Service;
//
//import model.Enrollment;
//import repository.EnrollmentRepository;
//
//import java.util.List;
//
//@Service
//public class EnrollmentService {
//
//    private final EnrollmentRepository repository;
//
//    public EnrollmentService(EnrollmentRepository repository) {
//        this.repository = repository;
//    }
//
//    public Enrollment enrollStudent(Enrollment enrollment) {
//        enrollment.setStatus("ENROLLED");
//        return repository.save(enrollment);
//    }
//
//    public List<Enrollment> getStudentEnrollments(Long studentId) {
//        return repository.findByStudentId(studentId);
//    }
//
//    public List<Enrollment> getCourseEnrollments(Long courseId) {
//        return repository.findByCourseId(courseId);
//    }
//
//    public Enrollment updateGrade(Long enrollmentId, String grade) {
//        Enrollment enrollment = repository.findById(enrollmentId).orElse(null);
//        if (enrollment != null) {
//            enrollment.setGrade(grade);
//            return repository.save(enrollment);
//        }
//        return null;
//    }
//
//    public void dropEnrollment(Long enrollmentId) {
//        repository.deleteById(enrollmentId);
//    }
//}