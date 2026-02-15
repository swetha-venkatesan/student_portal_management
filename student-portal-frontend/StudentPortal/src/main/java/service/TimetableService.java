package service;

import org.springframework.stereotype.Service;

import model.Timetable;
import repository.TimetableRepository;

import java.util.List;

@Service
public class TimetableService {

    private final TimetableRepository repository;

    public TimetableService(TimetableRepository repository) {
        this.repository = repository;
    }

    public List<Timetable> getAllSchedules() {
        return repository.findAll();
    }

    public Timetable addSchedule(Timetable timetable) {
        return repository.save(timetable);
    }

    public Timetable updateSchedule(Timetable timetable) {
        return repository.save(timetable);
    }

    public void deleteSchedule(Long id) {
        repository.deleteById(id);
    }

    public List<Timetable> getSchedulesByDay(String dayOfWeek) {
        return repository.findByDayOfWeek(dayOfWeek);
    }

    public List<Timetable> getCourseSchedule(Long courseId) {
        return repository.findByCourseId(courseId);
    }
}