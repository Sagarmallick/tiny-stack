import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (to, templateId) => {
  const mailOptions = {
    from: `"TinyStack" <${EMAIL_USER}>`,
    to,
    subject: "🎉 Purchase Confirmation",
    html: `
      <h2>Thank you for your purchase!</h2>
      <p>You have successfully purchased template <strong>${templateId}</strong>.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
  }
};

export default sendConfirmationEmail;
