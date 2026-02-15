package controller;

import org.springframework.web.bind.annotation.*;

import model.Notification;
import service.NotificationService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return service.createNotification(notification);
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getUserNotifications(@PathVariable Long userId) {
        return service.getUserNotifications(userId);
    }

    @GetMapping("/unread/{userId}")
    public List<Notification> getUnreadNotifications(@PathVariable Long userId) {
        return service.getUnreadNotifications(userId);
    }

    @GetMapping("/unread-count/{userId}")
    public Map<String, Long> getUnreadCount(@PathVariable Long userId) {
        return Map.of("count", service.getUnreadCount(userId));
    }

    @PutMapping("/mark-read/{notificationId}")
    public Notification markAsRead(@PathVariable Long notificationId) {
        return service.markAsRead(notificationId);
    }

    @PutMapping("/mark-all-read/{userId}")
    public void markAllAsRead(@PathVariable Long userId) {
        service.markAllAsRead(userId);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable Long id) {
        service.deleteNotification(id);
    }
}