package controller;

import org.springframework.web.bind.annotation.*;

import model.Timetable;
import service.TimetableService;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(origins = "http://localhost:3000")
public class TimetableController {

    private final TimetableService service;

    public TimetableController(TimetableService service) {
        this.service = service;
    }

    @GetMapping
    public List<Timetable> getAllSchedules() {
        return service.getAllSchedules();
    }

    @PostMapping
    public Timetable addSchedule(@RequestBody Timetable timetable) {
        return service.addSchedule(timetable);
    }

    @PutMapping("/{id}")
    public Timetable updateSchedule(@PathVariable Long id, @RequestBody Timetable timetable) {
        timetable.setId(id);
        return service.updateSchedule(timetable);
    }

    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        service.deleteSchedule(id);
    }

    @GetMapping("/day/{dayOfWeek}")
    public List<Timetable> getSchedulesByDay(@PathVariable String dayOfWeek) {
        return service.getSchedulesByDay(dayOfWeek);
    }

    @GetMapping("/course/{courseId}")
    public List<Timetable> getCourseSchedule(@PathVariable Long courseId) {
        return service.getCourseSchedule(courseId);
    }
}