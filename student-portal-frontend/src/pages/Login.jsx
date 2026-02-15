import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    axios
      .post("http://localhost:8080/api/auth/login", credentials)
      .then((response) => {
        if (response.data && response.data.username) {
          localStorage.setItem("user", JSON.stringify(response.data));
          
          // Redirect based on role
          if (response.data.role === "ADMIN") {
            navigate("/dashboard-layout/overview");
          } else if (response.data.role === "STUDENT") {
            navigate("/student-portal/dashboard");
          } else {
            navigate("/dashboard-layout/overview");
          }
        } else {
          setError("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError("Invalid username or password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <h1 style={styles.title}>Student Portal</h1>
          <p style={styles.subtitle}>Management System</p>
        </div>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleChange}
              required
              style={styles.input}
              disabled={loading}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
              style={styles.input}
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        <div style={styles.divider}>
          <span style={styles.dividerText}>OR</span>
        </div>

        <div style={styles.registerSection}>
          <p style={styles.registerText}>Don't have an account?</p>
          <Link to="/register" style={styles.registerLink}>
            <button style={styles.registerButton}>
              Register as Student
            </button>
          </Link>
        </div>
        
        <div style={styles.testCredentials}>
          <p style={styles.testTitle}>Test Credentials:</p>
          <div style={styles.credRow}>
            <span>👨‍💼 Admin:</span>
            <code style={styles.code}>swetha / 1234</code>
          </div>
          <div style={styles.credRow}>
            <span>👨‍🎓 Student:</span>
            <code style={styles.code}>john / 1234</code>
          </div>
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
    padding: "20px"
  },
  loginCard: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "450px"
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
    transition: "border-color 0.3s",
    outline: "none"
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
    marginTop: "10px"
  },
  error: {
    background: "#fee",
    color: "#c33",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    textAlign: "center",
    fontWeight: "500"
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "25px 0",
    position: "relative"
  },
  dividerText: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    background: "white",
    padding: "0 10px",
    color: "#999",
    fontSize: "14px",
    fontWeight: "600"
  },
  registerSection: {
    textAlign: "center",
    marginTop: "20px"
  },
  registerText: {
    margin: "0 0 15px 0",
    color: "#666",
    fontSize: "15px"
  },
  registerLink: {
    textDecoration: "none"
  },
  registerButton: {
    width: "100%",
    padding: "12px",
    fontSize: "15px",
    fontWeight: "600",
    background: "white",
    color: "#667eea",
    border: "2px solid #667eea",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s"
  },
  testCredentials: {
    marginTop: "30px",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "8px",
    fontSize: "14px"
  },
  testTitle: {
    margin: "0 0 10px 0",
    fontWeight: "600",
    color: "#333",
    fontSize: "14px"
  },
  credRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    color: "#666",
    fontSize: "13px"
  },
  code: {
    background: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    border: "1px solid #e0e0e0",
    fontSize: "12px",
    fontFamily: "monospace",
    color: "#333"
  }
};

// Add hover effects using CSS
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  input:focus {
    border-color: #667eea !important;
  }
  
  button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
document.head.appendChild(styleSheet);

export default Login;


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: ""
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     axios
//       .post("http://localhost:8080/api/auth/login", credentials)
//       .then((response) => {
//         if (response.data && response.data.username) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//           navigate("/dashboard-layout/overview");
//         } else {
//           setError("Invalid credentials");
//         }
//       })
//       .catch((error) => {
//         console.error("Login error:", error);
//         setError("Invalid username or password");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.loginCard}>
//         <div style={styles.header}>
//           <h1 style={styles.title}>Student Portal</h1>
//           <p style={styles.subtitle}>Management System</p>
//         </div>
        
//         {error && <div style={styles.error}>{error}</div>}
        
//         <form onSubmit={handleSubmit}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Username</label>
//             <input
//               type="text"
//               name="username"
//               placeholder="Enter your username"
//               value={credentials.username}
//               onChange={handleChange}
//               required
//               style={styles.input}
//               disabled={loading}
//             />
//           </div>
          
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={credentials.password}
//               onChange={handleChange}
//               required
//               style={styles.input}
//               disabled={loading}
//             />
//           </div>
          
//           <button 
//             type="submit" 
//             style={styles.button}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <div style={styles.footer}>
//           <p>
//             Don't have an account?{" "}
//             <Link to="/register" style={styles.link}>
//               Register here
//             </Link>
//           </p>
//         </div>
        
        
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     padding: "20px"
//   },
//   loginCard: {
//     background: "white",
//     padding: "40px",
//     borderRadius: "15px",
//     boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
//     width: "100%",
//     maxWidth: "400px"
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "30px"
//   },
//   title: {
//     margin: 0,
//     fontSize: "32px",
//     color: "#333",
//     fontWeight: "700"
//   },
//   subtitle: {
//     margin: "5px 0 0 0",
//     fontSize: "16px",
//     color: "#666"
//   },
//   formGroup: {
//     marginBottom: "20px"
//   },
//   label: {
//     display: "block",
//     marginBottom: "8px",
//     fontSize: "14px",
//     fontWeight: "600",
//     color: "#333"
//   },
//   input: {
//     width: "100%",
//     padding: "12px 15px",
//     fontSize: "16px",
//     border: "2px solid #e0e0e0",
//     borderRadius: "8px",
//     boxSizing: "border-box",
//     transition: "border-color 0.3s"
//   },
//   button: {
//     width: "100%",
//     padding: "14px",
//     fontSize: "16px",
//     fontWeight: "600",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "transform 0.2s",
//     marginTop: "10px"
//   },
//   error: {
//     background: "#fee",
//     color: "#c33",
//     padding: "12px",
//     borderRadius: "8px",
//     marginBottom: "20px",
//     fontSize: "14px",
//     textAlign: "center"
//   },
//   testCredentials: {
//     marginTop: "30px",
//     padding: "20px",
//     background: "#f8f9fa",
//     borderRadius: "8px",
//     fontSize: "14px"
//   },
//   testTitle: {
//     margin: "0 0 10px 0",
//     fontWeight: "600",
//     color: "#333"
//   },
//   credRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "8px",
//     color: "#666"
//   },
//   footer: {
//   textAlign: "center",
//   marginTop: "20px",
//   color: "#666"
// },
// link: {
//   color: "#667eea",
//   textDecoration: "none",
//   fontWeight: "600"
// }
// };

// export default Login;
