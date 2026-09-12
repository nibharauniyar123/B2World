
import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import LoginImage from "../assets/loginpage.jpg";
import { motion } from "framer-motion";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [rememberMe, setRememberMe] = useState(false);
  const nav = useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

//     const res = await axios.post("/api/auth/login", form);

//     // Save Login Data
// console.log(res.data.user);
// console.log(res.data.user.role);
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem(
//       "user",
//       JSON.stringify(res.data.user)
//     );

//     const role = res.data.user.role;

//     if (role === "SUPER_ADMIN") {
//       nav("/super-admin");
//     }
//     else if (role === "ADMIN") {
//       nav("/admin");
//     }
//     else if (role === "ACCOUNTANT") {
//       nav("/accountant");
//     }
//     else if (role === "GUARD") {
//       nav("/guard");
//     }
//     else if (role === "RESIDENT") {
//       nav("/resident");
//     }
//     else {
//       nav("/dashboard");
//     }
const res = await axios.post("/api/auth/login", form);

console.log("LOGIN RESPONSE:", res.data);
console.log("TOKEN FROM BACKEND:", res.data.token);
console.log("USER FROM BACKEND:", res.data.user);

if (!res.data.token) {
  alert("Login successful but JWT token was not received from backend.");
  return;
}

localStorage.setItem("token", res.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

console.log(
  "TOKEN SAVED:",
  localStorage.getItem("token")
);

const role = res.data.user.role;

if (role === "SUPER_ADMIN") {
  nav("/super-admin");
} else if (role === "ADMIN") {
  nav("/admin");
} else if (role === "ACCOUNTANT") {
  nav("/accountant");
} else if (role === "GUARD") {
  nav("/guard");
} else if (role === "RESIDENT") {
  nav("/resident");
} else {
  nav("/dashboard");
}

  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  } finally {
    setLoading(false);
  }
};

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleLogin} style={styles.card}>
//         <h2 style={styles.title}>Login</h2>

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
//         <p>
//   Don't have account? <a href="/register">Register</a>
// </p>

//         <button style={styles.button}>
//           {loading ? "Logging..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
return (
  <div style={styles.container}>
    {/* <div style={styles.loginBox}> */}
        <motion.div
      style={styles.loginBox}
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
    >


      {/* Left Side */}

      <div style={styles.leftSection}>

        <FaBuilding style={styles.logoIcon} />

        <h1 style={styles.mainTitle}>
          Society Management
        </h1>

        <p style={styles.subTitle}>
          Modern Smart Community Platform
        </p>



     
      <div style={styles.featureCard}>

🏢

Visitor Management

</div>

<div style={styles.featureCard}>

🛠

Maintenance

</div>

<div style={styles.featureCard}>

🔒

Secure Access

</div>

<div style={styles.featureCard}>

📊

Reports

</div>
        <img
   src={LoginImage}
   alt="Building"
   style={styles.image}
/>

</div>
   

      {/* Right Side */}

      <div style={styles.rightSection}>

        <h2 style={styles.title}>
          Welcome Back 👋
        </h2>

        <p style={styles.description}>
          Login to continue
        </p>
        {/* </div> */}
     

        <form onSubmit={handleLogin}>

          {/* Email */}

          <div style={styles.inputGroup}>

            <MdEmail style={styles.icon} />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              style={styles.input}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

          </div>
         

          {/* Password */}

          <div style={styles.inputGroup}>

            <FaLock style={styles.icon} />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={form.password}
              style={styles.input}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
 

            <span
              style={styles.eye}
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>
          <div style={styles.passwordHint}>
  <span style={styles.checkIcon}>✔</span>
  Minimum 8 characters required
</div>

          {/* Remember */}

          <div style={styles.row}>

            <label>

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(!rememberMe)
                }
              />

              {" "}Remember Me

            </label>

            <Link
              to="/forgot-password"
              style={styles.link}
            >
              Forgot Password?
            </Link>

          </div>

          {/* <button
            type="submit"
            style={styles.button}
          >
            {loading
              ? "Logging..."
              : "Login"}
          </button> */}
          {/* <button
    type="submit"
    style={{
        ...styles.button,
        opacity: loading ? 0.8 : 1,
        cursor: loading ? "not-allowed" : "pointer",
    }}
    disabled={loading}
>
    {loading ? (
        <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            Logging In...
        </div>
    ) : (
        "Login"
    )}
</button> */}
<button
  type="submit"
  disabled={loading}
  style={{
    ...styles.button,
    opacity: loading ? 0.8 : 1,
    cursor: loading ? "not-allowed" : "pointer",
  }}
  onMouseOver={(e) => {
    if (!loading) {
      e.target.style.transform = "scale(1.02)";
      e.target.style.boxShadow =
        "0 15px 35px rgba(37,99,235,.45)";
    }
  }}
  onMouseOut={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow =
      "0 10px 25px rgba(37,99,235,.35)";
  }}
>
  {loading ? "Logging In..." : "Login"}
</button>
         


        </form>

        <p style={styles.register}>

          Don't have an account?

          <Link
            to="/register"
            style={styles.link}
          >
            {" "}Register
          </Link>

        </p>
        <div style={styles.footer}>

© 2026 Society Management System

Version 1.0

</div>

      </div>
  </motion.div>
    </div>

  // </div>

);
}


const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef5ff",
    padding: "30px",
  },

  loginBox: {
    width: "100%",
    maxWidth: "1050px",
    background: "#fff",
    borderRadius: "20px",
    display: "flex",
    overflow: "hidden",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
  },

  leftSection: {
    flex: 1,
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px",
    textAlign: "center",
  },

  rightSection: {
    flex: 1,
    padding: "60px 50px",
    background: "#fff",
  },

  logoIcon: {
    fontSize: "60px",
    marginBottom: "15px",
  },

  mainTitle: {
    fontSize: "34px",
    marginBottom: "10px",
    fontWeight: "700",
  },

  subTitle: {
    fontSize: "17px",
    opacity: 0.9,
    marginBottom: "40px",
  },

  image: {
    width: "220px",
    maxWidth: "100%",
  },

  title: {
    fontSize: "34px",
    marginBottom: "10px",
    color: "#1e293b",
    fontWeight: "700",
  },

  description: {
    color: "#64748b",
    marginBottom: "35px",
    fontSize: "16px",
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    marginBottom: "20px",
    padding: "0 15px",
    background: "#fff",
  },

  icon: {
    color: "#2563eb",
    fontSize: "20px",
  },

  input: {
    flex: 1,
    padding: "16px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    background: "transparent",
  },

  eye: {
    cursor: "pointer",
    color: "#64748b",
    fontSize: "18px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    fontSize: "14px",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },

button: {
  width: "100%",
  padding: "16px",
  background: "linear-gradient(90deg, #2563eb, #3b82f6)",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: "600",
  transition: "all 0.3s ease",
  boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
},

  register: {
    marginTop: "30px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "15px",
  },
  featureCard:{
background:"rgba(255,255,255,.15)",
padding:"12px",
borderRadius:"12px",
marginBottom:"12px",
fontWeight:"500"
},
passwordHint: {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "-8px",
  marginBottom: "18px",
  marginLeft: "8px",
  color: "#64748b",
  fontSize: "13px",
  fontWeight: "500",
},
checkIcon: {
  color: "#22c55e",
  fontWeight: "bold",
  fontSize: "14px",
},
loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
},
spinner: {
    width: "18px",
    height: "18px",
    border: "3px solid rgba(255,255,255,0.4)",
    borderTop: "3px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
},
};

export default Login;
