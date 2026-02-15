import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const { studentId } = useOutletContext();
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (studentId) {
      fetchProfile();
    }
  }, [studentId]);

  const fetchProfile = () => {
    axios.get(`http://localhost:8080/api/student-portal/profile/${studentId}`)
      .then((res) => {
        setStudent(res.data);
        setEditData(res.data);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/api/student-portal/profile/${studentId}`, editData)
      .then(() => {
        alert("Profile updated successfully!");
        setStudent(editData);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update profile");
      });
  };

  if (!student) {
    return <div style={styles.loading}>Loading profile...</div>;
  }

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>My Profile</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
            ✏️ Edit Profile
          </button>
        )}
      </div>

      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={styles.name}>{student.name}</h2>
            <p style={styles.studentId}>Student ID: {student.studentId || "N/A"}</p>
          </div>
        </div>

        {!isEditing ? (
          <div style={styles.infoSection}>
            <div style={styles.infoRow}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Email:</span>
                <span style={styles.infoValue}>{student.email}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Department:</span>
                <span style={styles.infoValue}>{student.department}</span>
              </div>
            </div>

            <div style={styles.infoRow}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Phone:</span>
                <span style={styles.infoValue}>{student.phone || "Not provided"}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Enrollment Date:</span>
                <span style={styles.infoValue}>
                  {student.enrollmentDate || "N/A"}
                </span>
              </div>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Address:</span>
              <span style={styles.infoValue}>{student.address || "Not provided"}</span>
            </div>
          </div>
        ) : (
          <div style={styles.editSection}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Department</label>
              <input
                type="text"
                name="department"
                value={editData.department}
                onChange={handleChange}
                style={styles.input}
                disabled
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Address</label>
              <textarea
                name="address"
                value={editData.address || ""}
                onChange={handleChange}
                rows="3"
                style={styles.textarea}
              />
            </div>

            <div style={styles.buttonGroup}>
              <button onClick={handleSave} style={styles.saveBtn}>
                Save Changes
              </button>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditData(student);
                }} 
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },
  pageTitle: {
    fontSize: "28px",
    margin: 0,
    color: "#333"
  },
  editBtn: {
    padding: "10px 20px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  },
  profileCard: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f0f0f0",
    marginBottom: "30px"
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "48px",
    fontWeight: "bold"
  },
  name: {
    margin: "0 0 5px 0",
    fontSize: "24px",
    color: "#333"
  },
  studentId: {
    margin: 0,
    color: "#666",
    fontSize: "14px"
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  infoLabel: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "600"
  },
  infoValue: {
    fontSize: "16px",
    color: "#333"
  },
  editSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333"
  },
  input: {
    padding: "10px",
    border: "2px solid #e0e0e0",
    borderRadius: "5px",
    fontSize: "14px"
  },
  textarea: {
    padding: "10px",
    border: "2px solid #e0e0e0",
    borderRadius: "5px",
    fontSize: "14px",
    resize: "vertical"
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },
  saveBtn: {
    flex: 1,
    padding: "12px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  },
  cancelBtn: {
    flex: 1,
    padding: "12px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
    color: "#666"
  }
};

export default MyProfile;