// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendResetEmail = async (email, resetLink) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Reset Your Password",
//     html: `
//       <h2>Password Reset</h2>
//       <p>Click the button below to reset your password.</p>

//       <a href="${resetLink}"
//          style="
//            background:#2563eb;
//            color:white;
//            padding:12px 25px;
//            text-decoration:none;
//            border-radius:8px;
//          ">
//          Reset Password
//       </a>
//     `,
//   });
// };
// try {
//   const info = await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Reset Your Password",
//     html: `...`,
//   });

//   console.log("Email sent:", info.response);
// } catch (err) {
//   console.error("Email error:", err);
// }
import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter (runs once when server starts)
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Connected");
  }
});

// Send Reset Email
// export const sendResetEmail = async (email, resetLink) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Society Management System" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Reset Your Password",
//       html: `
//         <h2>Password Reset Request</h2>

//         <p>You requested to reset your password.</p>

//         <p>Click the button below:</p>

//         <a href="${resetLink}"
//           style="
//             background:#2563eb;
//             color:white;
//             padding:12px 20px;
//             text-decoration:none;
//             border-radius:6px;
//             display:inline-block;
//           ">
//           Reset Password
//         </a>

//         <p>If you didn't request this, please ignore this email.</p>
//       `,
//     });

//     console.log("✅ Email sent:", info.response);
//     return info;
//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//     throw error;
//   }
// };
export const sendResetEmail = async (email, resetLink) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <a href="${resetLink}">Reset Password</a>
      `,
    });

    console.log("✅ Email sent:", info);
  } catch (error) {
    console.error("❌ Email Error:");
    console.error(error);
    throw error;
  }
};