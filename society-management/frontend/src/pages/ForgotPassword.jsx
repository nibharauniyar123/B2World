import { useState } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

import ForgotImage from "../assets/forgetpassword.jpg";
function ForgotPassword() {
 const [email, setEmail] = useState("");

const [loading, setLoading] = useState(false);
const handleForgotPassword = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    await axios.post("/api/auth/forgot-password", {
      email,
    });

    alert("Password reset link sent to your email.");
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to send reset link"
    );
  } finally {
    setLoading(false);
  }
};
return (
  <div style={styles.container}>
    <div style={styles.loginBox}>
      
      {/* Left Section */}
      <div style={styles.leftSection}>
        <FaBuilding style={styles.logoIcon} />

        <h1 style={styles.mainTitle}>
          Society Management System
        </h1>

        <p style={styles.subTitle}>
          Recover your account securely.
        </p>

        <img
          src={ForgotImage}
          alt="Forgot Password"
          style={styles.image}
        />
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        <h2 style={styles.title}>
          Forgot Password 🔒
        </h2>

        <p style={styles.description}>
          Enter your registered email to receive a password reset link.
        </p>

        <form
          onSubmit={handleForgotPassword}
          style={styles.form}
        >
          <div style={styles.inputBox}>
            <MdEmail style={styles.icon} />

            <input
              type="email"
              placeholder="Email Address"
              style={styles.input}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <button
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

          <p style={styles.bottomText}>
            Remember your password?{" "}
            <Link
              to="/login"
              style={styles.link}
            >
              Login
            </Link>
          </p>
        </form>
      </div>

    </div>
  </div>
)};
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef5ff",
    padding: "30px",
    fontFamily: "'Poppins', sans-serif",
  },

  loginBox: {
    width: "1100px",
    minHeight: "650px",
    background: "#fff",
    display: "flex",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 15px 40px rgba(0,0,0,.15)",
  },

  /* LEFT SECTION */

  leftSection: {
    flex: 1,
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    padding: "40px",
  },

  logoIcon: {
    fontSize: "60px",
    marginBottom: "15px",
  },

  mainTitle: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "10px",
    textAlign: "center",
  },

  subTitle: {
    fontSize: "17px",
    opacity: 0.9,
    marginBottom: "30px",
    textAlign: "center",
  },

  image: {
    width: "90%",
    maxWidth: "380px",
    objectFit: "contain",
  },

  /* RIGHT SECTION */

  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#1f2937",
  },

  description: {
    color: "#6b7280",
    marginBottom: "35px",
    lineHeight: "1.6",
  },

  form: {
    width: "100%",
  },

  /* INPUT */

  inputBox: {
    display: "flex",
    alignItems: "center",
    height: "58px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    padding: "0 18px",
    marginBottom: "25px",
  },

  icon: {
    color: "#2563eb",
    fontSize: "20px",
    marginRight: "12px",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    background: "transparent",
  },

  /* BUTTON */

  button: {
    width: "100%",
    height: "55px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: ".3s",
  },

  /* FOOTER */

  bottomText: {
    marginTop: "25px",
    textAlign: "center",
    color: "#666",
    fontSize: "15px",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
};
export default ForgotPassword;
