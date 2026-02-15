import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const MyFees = () => {
  const { studentId } = useOutletContext();
  const [feesData, setFeesData] = useState({
    totalAmount: 0,
    totalPaid: 0,
    totalDue: 0,
    fees: []
  });
  const [loading, setLoading] = useState(true);
  const [paymentModal, setPaymentModal] = useState({ show: false, feeId: null, amount: "" });

  useEffect(() => {
    if (studentId) {
      fetchFees();
    }
  }, [studentId]);

  const fetchFees = () => {
    axios.get(`http://localhost:8080/api/student-portal/fees/${studentId}`)
      .then((res) => {
        setFeesData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handlePayment = () => {
    if (!paymentModal.amount || paymentModal.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    axios.post(`http://localhost:8080/api/fees/pay/${paymentModal.feeId}`, {
      amount: parseFloat(paymentModal.amount)
    })
      .then(() => {
        alert("Payment recorded successfully!");
        setPaymentModal({ show: false, feeId: null, amount: "" });
        fetchFees();
      })
      .catch((error) => {
        console.error(error);
        alert("Payment failed");
      });
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

  if (loading) {
    return <div style={styles.loading}>Loading fees...</div>;
  }

  return (
    <div>
      <h1 style={styles.pageTitle}>My Fees</h1>

      {/* Fee Summary Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div>
            <h3 style={styles.statNumber}>₹{feesData.totalAmount.toLocaleString()}</h3>
            <p style={styles.statLabel}>Total Fees</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div>
            <h3 style={styles.statNumber}>₹{feesData.totalPaid.toLocaleString()}</h3>
            <p style={styles.statLabel}>Paid</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏳</div>
          <div>
            <h3 style={styles.statNumber}>₹{feesData.totalDue.toLocaleString()}</h3>
            <p style={styles.statLabel}>Due</p>
          </div>
        </div>
      </div>

      {/* Fee Records */}
      {feesData.fees.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>💳</div>
          <h3>No Fee Records</h3>
          <p>No fees have been assigned yet.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <h3>Fee Details</h3>
          <table style={styles.table}>
            <thead>
              <tr>
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
              {feesData.fees.map((fee) => (
                <tr key={fee.id}>
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
      )}

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
  pageTitle: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#333"
  },
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
  input: {
    width: "100%",
    padding: "10px",
    border: "2px solid #e0e0e0",
    borderRadius: "5px",
    fontSize: "14px",
    boxSizing: "border-box"
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
  },
  emptyState: {
    background: "white",
    padding: "60px 20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "20px"
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
    color: "#666"
  }
};

export default MyFees;