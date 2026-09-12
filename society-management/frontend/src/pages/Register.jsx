// import { useState } from "react";
// import axios from "../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { MdEmail } from "react-icons/md";
// import { FaUser, FaPhone, FaLock, FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";
// import RegisterImage from "../assets/register.png";

// function Register() {
//   const nav = useNavigate();

//   // const [form, setForm] = useState({
//   //   name: "",
//   //   email: "",
//   //   password: "",
//   // });
//   const [form, setForm] = useState({
//   fullName: "",
//   email: "",
//   phone: "",
//   password: "",
//   confirmPassword: "",
//   role: "RESIDENT",
// });

// const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await axios.post("/api/auth/register", form);

//       alert("Registered successfully");

//       nav("/login");
//     } catch (error) {
//       alert(error.response?.data?.message || "Register failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleRegister} style={styles.card}>
//         <h2 style={styles.title}>Register</h2>

//         <input
//           type="text"
//           placeholder="Full Name"
//           style={styles.input}
//           value={form.fullName}
//           onChange={(e) =>
//             setForm({ ...form, fullName: e.target.value })
//           }
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           style={styles.input}
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           style={styles.input}
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />
        

//         <button style={styles.button}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#f3f4f6",
//   },
//   card: {
//     background: "white",
//     padding: "30px",
//     borderRadius: "12px",
//     width: "350px",
//     boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
//   },
//   title: {
//     marginBottom: "20px",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "15px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "#16a34a",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//   },
// };

// export default Register;
import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import {
  FaUser,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBuilding,
} from "react-icons/fa";

import RegisterImage from "../assets/register.png";

function Register() {
  const nav = useNavigate();
const [form, setForm] = useState({
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "RESIDENT",
});

const [loading, setLoading] = useState(false);

const [showPassword, setShowPassword] = useState(false);

const [showConfirmPassword, setShowConfirmPassword] =
  useState(false);

const handleRegister = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (form.password.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  try {
    setLoading(true);

    await axios.post("/api/auth/register", {
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: form.role,
    });

    alert("Registration Successful");

    nav("/login");
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Registration Failed"
    );
  } finally {
    setLoading(false);
  }
};
return (
  <div style={styles.container}>
    <div style={styles.loginBox}>

      {/* Left Side */}

      <div style={styles.leftSection}>

        <FaBuilding style={styles.logoIcon} />

        <h1 style={styles.mainTitle}>
          Society Management System
        </h1>

        <p style={styles.subTitle}>
          Smart Community Platform
        </p>

        <div style={styles.featureBox}>
          <p>✔ Visitor Management</p>
          <p>✔ Complaint Tracking</p>
          <p>✔ Maintenance Billing</p>
          <p>✔ Secure Access</p>
        </div>

        <img
          src={RegisterImage}
          alt="Register"
          style={styles.image}
        />

      </div>

      {/* Right Side */}

      <div style={styles.rightSection}>

        <h2 style={styles.title}>
          Create Account 🚀
        </h2>

        <p style={styles.description}>
          Join Smart Community Platform
        </p>
<form onSubmit={handleRegister} style={styles.form}>
  {/* Full Name */}

  <div style={styles.inputBox}>
    <FaUser style={styles.icon} />
    <input
      type="text"
      placeholder="Full Name"
      style={styles.input}
      value={form.fullName}
      onChange={(e) =>
        setForm({ ...form, fullName: e.target.value })
      }
      required
    />
  </div>

  {/* Email */}

  <div style={styles.inputBox}>
    <MdEmail style={styles.icon} />
    <input
      type="email"
      placeholder="Email Address"
      style={styles.input}
      value={form.email}
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
      required
    />
  </div>

  {/* Phone */}

  <div style={styles.inputBox}>
    <FaPhone style={styles.icon} />
    <input
      type="text"
      placeholder="Phone Number"
      style={styles.input}
      value={form.phone}
      onChange={(e) =>
        setForm({ ...form, phone: e.target.value })
      }
    />
  </div>

  {/* Password */}

  <div style={styles.inputBox}>
    <FaLock style={styles.icon} />

    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      style={styles.input}
      value={form.password}
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
      required
    />

    <span
      style={styles.eye}
      onClick={() =>
        setShowPassword(!showPassword)
      }
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>

  {/* Password Strength */}

  <div style={styles.passwordStrength}>
    {form.password.length === 0 ? (
      <span style={{ color: "#999" }}>
        Password must be at least 8 characters
      </span>
    ) : form.password.length < 8 ? (
      <span style={{ color: "red" }}>
        Weak Password
      </span>
    ) : (
      <span style={{ color: "green" }}>
        Strong Password ✓
      </span>
    )}
  </div>

  {/* Confirm Password */}

  <div style={styles.inputBox}>
    <FaLock style={styles.icon} />

    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm Password"
      style={styles.input}
      value={form.confirmPassword}
      onChange={(e) =>
        setForm({
          ...form,
          confirmPassword: e.target.value,
        })
      }
      required
    />

    <span
      style={styles.eye}
      onClick={() =>
        setShowConfirmPassword(
          !showConfirmPassword
        )
      }
    >
      {showConfirmPassword ? (
        <FaEyeSlash />
      ) : (
        <FaEye />
      )}
    </span>
  </div>

  {/* Password Match */}

  {form.confirmPassword !== "" && (
    <div style={styles.passwordStrength}>
      {form.password === form.confirmPassword ? (
        <span style={{ color: "green" }}>
          Passwords Match ✓
        </span>
      ) : (
        <span style={{ color: "red" }}>
          Passwords Do Not Match
        </span>
      )}
    </div>
  )}

  {/* Role */}

  <select
    style={styles.select}
    value={form.role}
    onChange={(e) =>
      setForm({
        ...form,
        role: e.target.value,
      })
    }
  >
    {/* <option value="RESIDENT">Resident</option>
    <option value="TENANT">Tenant</option>
    <option value="ADMIN">Admin</option> */}
      <option value="SUPER_ADMIN">Super Admin</option>
  <option value="ADMIN">Admin</option>
  <option value="RESIDENT">Resident</option>
  <option value="TENANT">Tenant</option>
  <option value="GUARD">Guard</option>
  <option value="ACCOUNTANT">Accountant</option>
  </select>

  {/* Register Button */}

  <button
    type="submit"
    style={styles.button}
    disabled={loading}
  >
    {loading
      ? "Creating Account..."
      : "Create Account"}
  </button>

  {/* Login Link */}

  <p style={styles.bottomText}>
    Already have an account?{" "}
    <Link to="/login" style={styles.link}>
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
    minHeight: "700px",
    display: "flex",
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
  },

  /* LEFT SIDE */

  leftSection: {
    flex: 1,
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: "16px",
    opacity: 0.9,
    marginBottom: "30px",
    textAlign: "center",
  },

  featureBox: {
    background: "rgba(255,255,255,0.15)",
    padding: "20px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "320px",
    marginBottom: "30px",
    lineHeight: "2",
    backdropFilter: "blur(12px)",
  },

  image: {
    width: "85%",
    maxWidth: "350px",
    objectFit: "contain",
  },

  /* RIGHT SIDE */

  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "50px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#1f2937",
  },

  description: {
    color: "#6b7280",
    marginBottom: "30px",
  },

  form: {
    width: "100%",
  },

  /* INPUT */

  inputBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    padding: "0 15px",
    marginBottom: "18px",
    height: "55px",
    position: "relative",
    transition: ".3s",
  },

  icon: {
    color: "#2563eb",
    fontSize: "18px",
    marginRight: "10px",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "15px",
    background: "transparent",
  },

  eye: {
    cursor: "pointer",
    color: "#666",
    fontSize: "18px",
  },

  /* PASSWORD */

  passwordStrength: {
    fontSize: "13px",
    marginTop: "-10px",
    marginBottom: "15px",
    paddingLeft: "5px",
  },

  /* SELECT */

  select: {
    width: "100%",
    height: "55px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    padding: "0 15px",
    fontSize: "15px",
    marginBottom: "20px",
    outline: "none",
    cursor: "pointer",
  },

  /* BUTTON */

  button: {
    width: "100%",
    height: "55px",
    background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: ".3s",
  },

  /* LOGIN LINK */

  bottomText: {
    textAlign: "center",
    marginTop: "25px",
    color: "#555",
    fontSize: "15px",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
};
export default Register;