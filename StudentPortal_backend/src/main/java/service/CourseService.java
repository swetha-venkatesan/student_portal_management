package service;

import org.springframework.stereotype.Service;

import model.Course;
import repository.CourseRepository;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository repository;

    public CourseService(CourseRepository repository) {
        this.repository = repository;
    }

    public List<Course> getAllCourses() {
        return repository.findAll();
    }

    public Course getCourseById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Course addCourse(Course course) {
        return repository.save(course);
    }

    public Course updateCourse(Course course) {
        return repository.save(course);
    }

    public void deleteCourse(Long id) {
        repository.deleteById(id);
    }
}













//package service;
//
//import org.springframework.stereotype.Service;
//
//import model.Course;
//import repository.CourseRepository;
//
//import java.util.List;
//
//@Service
//public class CourseService {
//
//    private final CourseRepository repository;
//
//    public CourseService(CourseRepository repository) {
//        this.repository = repository;
//    }
//
//    public List<Course> getAllCourses() {
//        return repository.findAll();
//    }
//
//    public Course addCourse(Course course) {
//        return repository.save(course);
//    }
//}
//
