import React, { useEffect, useState } from "react";
import { getAllFees, addFee, payFee, getOverallFeeStats } from "../services/FeeService";
import { getAllStudents } from "../services/StudentService";

const FeeManagement = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({});
  const [newFee, setNewFee] = useState({
    studentId: "",
    feeType: "",
    amount: "",
    dueDate: "",
    semester: ""
  });
  const [paymentModal, setPaymentModal] = useState({ show: false, feeId: null, amount: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAllFees().then((res) => setFees(res.data));
    getAllStudents().then((res) => setStudents(res.data));
    getOverallFeeStats().then((res) => setStats(res.data));
  };

  const handleChange = (e) => {
    setNewFee({
      ...newFee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFee(newFee)
      .then(() => {
        alert("Fee added successfully!");
        setNewFee({ studentId: "", feeType: "", amount: "", dueDate: "", semester: "" });
        fetchData();
      })
      .catch((error) => console.error(error));
  };

  const handlePayment = () => {
    if (!paymentModal.amount || paymentModal.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    payFee(paymentModal.feeId, parseFloat(paymentModal.amount))
      .then(() => {
        alert("Payment recorded successfully!");
        setPaymentModal({ show: false, feeId: null, amount: "" });
        fetchData();
      })
      .catch((error) => console.error(error));
  };

  const getStudentName = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student ? student.name : "Unknown";
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "PAID": return "#28a745";
      case "PENDING": return "#ffc107";
      case "PARTIAL": return "#17a2b8";
      case "OVERDUE": return "#dc3545";
      default: return "#6c757d";
    }
  };

  return (
    <div>
      <h2>Fee Management</h2>

      {/* Fee Statistics */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div>
            <h3 style={styles.statNumber}>₹{stats.totalAmount?.toLocaleString() || 0}</h3>
            <p style={styles.statLabel}>Total Fees</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div>
            <h3 style={styles.statNumber}>₹{stats.totalPaid?.toLocaleString() || 0}</h3>
            <p style={styles.statLabel}>Total Paid</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏳</div>
          <div>
            <h3 style={styles.statNumber}>₹{stats.totalDue?.toLocaleString() || 0}</h3>
            <p style={styles.statLabel}>Total Due</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div>
            <h3 style={styles.statNumber}>{stats.totalFees || 0}</h3>
            <p style={styles.statLabel}>Total Records</p>
          </div>
        </div>
      </div>

      {/* Add Fee Form */}
      <div style={styles.formContainer}>
        <h3>Add New Fee</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            name="studentId"
            value={newFee.studentId}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} - {s.email}
              </option>
            ))}
          </select>

          <select
            name="feeType"
            value={newFee.feeType}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Fee Type</option>
            <option value="TUITION">Tuition Fee</option>
            <option value="LIBRARY">Library Fee</option>
            <option value="LAB">Lab Fee</option>
            <option value="SPORTS">Sports Fee</option>
            <option value="HOSTEL">Hostel Fee</option>
            <option value="TRANSPORT">Transport Fee</option>
            <option value="EXAM">Exam Fee</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newFee.amount}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="date"
            name="dueDate"
            value={newFee.dueDate}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="semester"
            placeholder="Semester (e.g., Fall 2024)"
            value={newFee.semester}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.submitBtn}>
            Add Fee
          </button>
        </form>
      </div>

      {/* Fee Records Table */}
      <div style={styles.tableContainer}>
        <h3>Fee Records</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Student</th>
              <th style={styles.th}>Fee Type</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Paid</th>
              <th style={styles.th}>Balance</th>
              <th style={styles.th}>Due Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id}>
                <td style={styles.td}>{getStudentName(fee.studentId)}</td>
                <td style={styles.td}>{fee.feeType}</td>
                <td style={styles.td}>₹{fee.amount.toLocaleString()}</td>
                <td style={styles.td}>₹{fee.paidAmount.toLocaleString()}</td>
                <td style={styles.td}>
                  ₹{(fee.amount - fee.paidAmount).toLocaleString()}
                </td>
                <td style={styles.td}>{fee.dueDate}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    background: getStatusColor(fee.status)
                  }}>
                    {fee.status}
                  </span>
                </td>
                <td style={styles.td}>
                  {fee.status !== "PAID" && (
                    <button
                      onClick={() => setPaymentModal({ 
                        show: true, 
                        feeId: fee.id, 
                        amount: (fee.amount - fee.paidAmount).toString() 
                      })}
                      style={styles.payBtn}
                    >
                      💳 Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {paymentModal.show && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Record Payment</h3>
            <label style={styles.label}>Payment Amount:</label>
            <input
              type="number"
              value={paymentModal.amount}
              onChange={(e) => setPaymentModal({ ...paymentModal, amount: e.target.value })}
              style={styles.input}
              placeholder="Enter amount"
            />
            <div style={styles.modalButtons}>
              <button onClick={handlePayment} style={styles.confirmBtn}>
                Confirm Payment
              </button>
              <button 
                onClick={() => setPaymentModal({ show: false, feeId: null, amount: "" })}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  statCard: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  statIcon: {
    fontSize: "48px"
  },
  statNumber: {
    fontSize: "28px",
    margin: "0",
    color: "#667eea",
    fontWeight: "bold"
  },
  statLabel: {
    margin: "5px 0 0 0",
    color: "#666",
    fontSize: "14px"
  },
  formContainer: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "30px"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "15px"
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px"
  },
  submitBtn: {
    padding: "10px 20px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  },
  tableContainer: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px"
  },
  th: {
    background: "#667eea",
    color: "white",
    padding: "12px",
    textAlign: "left",
    fontSize: "14px"
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd",
    fontSize: "14px"
  },
  statusBadge: {
    padding: "5px 12px",
    borderRadius: "20px",
    color: "white",
    fontSize: "12px",
    fontWeight: "600"
  },
  payBtn: {
    padding: "6px 15px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "13px"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    maxWidth: "90%"
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "600"
  },
  modalButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },
  confirmBtn: {
    flex: 1,
    padding: "10px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  cancelBtn: {
    flex: 1,
    padding: "10px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default FeeManagement;