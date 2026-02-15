package service;

import org.springframework.stereotype.Service;

import model.Notification;
import repository.NotificationRepository;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public Notification createNotification(Notification notification) {
        return repository.save(notification);
    }

    public List<Notification> getUserNotifications(Long userId) {
        return repository.findByUserId(userId);
    }

    public List<Notification> getUnreadNotifications(Long userId) {
        return repository.findByUserIdAndIsRead(userId, false);
    }

    public long getUnreadCount(Long userId) {
        return repository.countByUserIdAndIsRead(userId, false);
    }

    public Notification markAsRead(Long notificationId) {
        Notification notification = repository.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setRead(true);
            return repository.save(notification);
        }
        return null;
    }

    public void markAllAsRead(Long userId) {
        List<Notification> notifications = repository.findByUserIdAndIsRead(userId, false);
        notifications.forEach(n -> n.setRead(true));
        repository.saveAll(notifications);
    }

    public void deleteNotification(Long id) {
        repository.deleteById(id);
    }
}