import React, { useState, useEffect } from "react";
import { getUnreadNotifications, markAsRead, getUnreadCount } from "../services/NotificationService";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  const fetchNotifications = () => {
    getUnreadNotifications(userId)
      .then((res) => setNotifications(res.data))
      .catch((error) => console.error(error));
    
    getUnreadCount(userId)
      .then((res) => setUnreadCount(res.data.count))
      .catch((error) => console.error(error));
  };

  const handleMarkAsRead = (notificationId) => {
    markAsRead(notificationId)
      .then(() => {
        fetchNotifications();
      })
      .catch((error) => console.error(error));
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case "INFO": return "ℹ️";
      case "WARNING": return "⚠️";
      case "SUCCESS": return "✅";
      case "ERROR": return "❌";
      default: return "📢";
    }
  };

  return (
    <div style={styles.container}>
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        style={styles.bellButton}
      >
        🔔
        {unreadCount > 0 && (
          <span style={styles.badge}>{unreadCount}</span>
        )}
      </button>

      {showDropdown && (
        <div style={styles.dropdown}>
          <div style={styles.header}>
            <h4 style={styles.title}>Notifications</h4>
            <button 
              onClick={() => setShowDropdown(false)}
              style={styles.closeBtn}
            >
              ×
            </button>
          </div>

          <div style={styles.notificationList}>
            {notifications.length === 0 ? (
              <p style={styles.noNotifications}>No new notifications</p>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  style={styles.notificationItem}
                  onClick={() => handleMarkAsRead(notif.id)}
                >
                  <div style={styles.notifIcon}>
                    {getNotificationIcon(notif.type)}
                  </div>
                  <div style={styles.notifContent}>
                    <h5 style={styles.notifTitle}>{notif.title}</h5>
                    <p style={styles.notifMessage}>{notif.message}</p>
                    <span style={styles.notifTime}>
                      {new Date(notif.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "relative"
  },
  bellButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    position: "relative",
    padding: "5px"
  },
  badge: {
    position: "absolute",
    top: "0",
    right: "0",
    background: "#dc3545",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },
  dropdown: {
    position: "absolute",
    top: "40px",
    right: "0",
    width: "350px",
    maxHeight: "500px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1000
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    borderBottom: "1px solid #e0e0e0"
  },
  title: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600"
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#999"
  },
  notificationList: {
    maxHeight: "400px",
    overflowY: "auto"
  },
  notificationItem: {
    display: "flex",
    gap: "10px",
    padding: "15px",
    borderBottom: "1px solid #f0f0f0",
    cursor: "pointer",
    transition: "background 0.2s"
  },
  notifIcon: {
    fontSize: "24px",
    flexShrink: 0
  },
  notifContent: {
    flex: 1
  },
  notifTitle: {
    margin: "0 0 5px 0",
    fontSize: "14px",
    fontWeight: "600"
  },
  notifMessage: {
    margin: "0 0 5px 0",
    fontSize: "13px",
    color: "#666"
  },
  notifTime: {
    fontSize: "11px",
    color: "#999"
  },
  noNotifications: {
    padding: "30px",
    textAlign: "center",
    color: "#999"
  }
};

export default NotificationBell;