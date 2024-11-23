import React, { useState } from "react";
import { api } from "../config/api";

interface AppointmentFormProps {
  onSuccess: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    timeSlot: "",
    doctorName: "Dr. Smith",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/", formData);
      alert("Appointment booked successfully!");
      onSuccess();
    } catch (error: any) {
      alert(error.response?.data?.error || "Error booking appointment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <label htmlFor="firstName">Enter your first name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <label htmlFor="lastName">Enter your last name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <label htmlFor="email">Enter your email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="timeSlot">Enter your time slot</label>
      <input
        type="datetime-local"
        name="timeSlot"
        id="timeSlot"
        placeholder="Time Slot (e.g., 10:00 AM - 11:00 AM)"
        value={formData.timeSlot}
        onChange={handleChange}
        required
      />
      <label htmlFor="doctorName">Select doctor</label>
      <select
        name="doctorName"
        id="doctorName"
        value={formData.doctorName}
        onChange={handleChange}
      >
        <option value="Dr. Smith">Dr. Smith</option>
        <option value="Dr. Jones">Dr. Jones</option>
        <option value="Dr. Taylor">Dr. Taylor</option>
      </select>
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
