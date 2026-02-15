package controller;

import org.springframework.web.bind.annotation.*;

import model.Course;
import service.CourseService;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Course> getCourses() {
        return service.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourse(@PathVariable Long id) {
        return service.getCourseById(id);
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return service.addCourse(course);
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course) {
        course.setId(id);
        return service.updateCourse(course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        service.deleteCourse(id);
    }
}















//package controller;
//
//import org.springframework.web.bind.annotation.*;
//
//import model.Course;
//import service.CourseService;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/courses")
//@CrossOrigin(origins = "http://localhost:3000")
//public class CourseController {
//
//    private final CourseService service;
//
//    public CourseController(CourseService service) {
//        this.service = service;
//    }
//
//    @GetMapping
//    public List<Course> getCourses() {
//        return service.getAllCourses();
//    }
//
//    @PostMapping
//    public Course addCourse(@RequestBody Course course) {
//        return service.addCourse(course);
//    }
//}



