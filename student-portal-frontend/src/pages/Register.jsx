import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Check username availability
    if (e.target.name === "username" && e.target.value.length >= 3) {
      checkUsername(e.target.value);
    }
  };

  const checkUsername = (username) => {
    axios.get(`http://localhost:8080/api/auth/check-username/${username}`)
      .then((res) => {
        setUsernameAvailable(!res.data.exists);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    if (!usernameAvailable) {
      setError("Username is already taken");
      return;
    }

    setLoading(true);

    axios
      .post("http://localhost:8080/api/auth/register", formData)
      .then((response) => {
        alert("Registration successful! Please login.");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response?.data?.error || "Registration failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.registerCard}>
        <div style={styles.header}>
          <h1 style={styles.title}>Student Registration</h1>
          <p style={styles.subtitle}>Create your account</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <h3 style={styles.sectionTitle}>Personal Information</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <textarea
              name="address"
              placeholder="Your address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              style={{...styles.input, resize: "vertical"}}
            />
          </div>

          <h3 style={styles.sectionTitle}>Account Credentials</h3>

          <div style={styles.formGroup}>
            <label style={styles.label}>Username *</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength="3"
              style={{
                ...styles.input,
                borderColor: usernameAvailable === false ? "#dc3545" : 
                            usernameAvailable === true ? "#28a745" : "#e0e0e0"
              }}
            />
            {usernameAvailable === false && (
              <span style={styles.errorText}>Username already taken</span>
            )}
            {usernameAvailable === true && (
              <span style={styles.successText}>Username available ✓</span>
            )}
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="4"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{
                  ...styles.input,
                  borderColor: formData.confirmPassword && 
                              formData.password !== formData.confirmPassword ? 
                              "#dc3545" : "#e0e0e0"
                }}
              />
              {formData.confirmPassword && 
               formData.password !== formData.confirmPassword && (
                <span style={styles.errorText}>Passwords do not match</span>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            style={styles.button}
            disabled={loading || !usernameAvailable}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div style={styles.footer}>
          <p>Already have an account? <Link to="/" style={styles.link}>Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px"
  },
  registerCard: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "600px"
  },
  header: {
    textAlign: "center",
    marginBottom: "30px"
  },
  title: {
    margin: 0,
    fontSize: "32px",
    color: "#333",
    fontWeight: "700"
  },
  subtitle: {
    margin: "5px 0 0 0",
    fontSize: "16px",
    color: "#666"
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#667eea",
    marginTop: "20px",
    marginBottom: "15px",
    borderBottom: "2px solid #667eea",
    paddingBottom: "5px"
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },
  formGroup: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#333"
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    boxSizing: "border-box",
    transition: "border-color 0.3s"
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s",
    marginTop: "20px"
  },
  error: {
    background: "#fee",
    color: "#c33",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    textAlign: "center"
  },
  errorText: {
    color: "#dc3545",
    fontSize: "12px",
    display: "block",
    marginTop: "5px"
  },
  successText: {
    color: "#28a745",
    fontSize: "12px",
    display: "block",
    marginTop: "5px"
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
    color: "#666"
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600"
  }
};

export default Register;