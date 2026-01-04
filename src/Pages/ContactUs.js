import React, { useState } from "react";
import "../Styles/ContactUs.css";
import { sendContactMessage } from "../api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitMsg, setSubmitMsg] = useState("");
  const [submitErr, setSubmitErr] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!/^\d{8}$/.test(formData.phone)) newErrors.phone = "Phone must be 8 digits";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg("");
    setSubmitErr("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      // Send to backend
      await sendContactMessage({
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      });

      setSubmitMsg("Message sent ✅");
      setFormData({ fullName: "", phone: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      setSubmitErr(err?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // optional: clear field-specific error as user types
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[e.target.name];
        return copy;
      });
    }
  };

  return (
    <div className="contactus-wrapper">
      <h2 className="contactus-title">Contact Us</h2>

      {submitMsg && <p style={{ color: "green" }}>{submitMsg}</p>}
      {submitErr && <p style={{ color: "red" }}>{submitErr}</p>}

      <form className="contactus-form" onSubmit={handleSubmit}>
        <div className="contactus-field">
          <label className="contactus-label">Full Name</label>
          <input
            className="contactus-input"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="contactus-error">{errors.fullName}</span>}
        </div>

        <div className="contactus-field">
          <label className="contactus-label">Phone Number</label>
          <input
            className="contactus-input"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="contactus-error">{errors.phone}</span>}
        </div>

        <div className="contactus-field">
          <label className="contactus-label">Email</label>
          <input
            className="contactus-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="contactus-error">{errors.email}</span>}
        </div>

        <div className="contactus-field">
          <label className="contactus-label">Message</label>
          <textarea
            className="contactus-textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <span className="contactus-error">{errors.message}</span>}
        </div>

        <button className="contactus-button" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
