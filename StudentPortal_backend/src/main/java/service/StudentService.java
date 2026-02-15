package service;

import org.springframework.stereotype.Service;

import model.Student;
import repository.StudentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student addStudent(Student student) {
        // Auto-generate student ID
        if (student.getStudentId() == null || student.getStudentId().isEmpty()) {
            student.setStudentId(generateStudentId());
        }
        return repository.save(student);
    }

    public Student getStudentById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Student updateStudent(Student student) {
        return repository.save(student);
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public List<Student> searchStudents(String keyword) {
        List<Student> allStudents = repository.findAll();
        return allStudents.stream()
                .filter(s -> s.getName().toLowerCase().contains(keyword.toLowerCase()) ||
                            s.getEmail().toLowerCase().contains(keyword.toLowerCase()) ||
                            s.getDepartment().toLowerCase().contains(keyword.toLowerCase()) ||
                            (s.getStudentId() != null && s.getStudentId().toLowerCase().contains(keyword.toLowerCase())))
                .collect(Collectors.toList());
    }

    private String generateStudentId() {
        long count = repository.count();
        return String.format("ST%04d", count + 1);
    }
}





















//package service;
//
//import org.springframework.stereotype.Service;
//
//import model.Student;
//import repository.StudentRepository;
//
//import java.util.List;
//
//@Service
//public class StudentService {
//
//    private final StudentRepository repository;
//
//    public StudentService(StudentRepository repository) {
//        this.repository = repository;
//    }
//
//    public List<Student> getAllStudents() {
//        return repository.findAll();
//    }
//
//    public Student addStudent(Student student) {
//        return repository.save(student);
//    }
//
//    public Student getStudentById(Long id) {
//        return repository.findById(id).orElse(null);
//    }
//
//    public void deleteStudent(Long id) {
//        repository.deleteById(id);
//    }
//}
