import React, { useState } from "react";
import { api } from "../config/api";

const ModifyAppointment: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    originalTimeSlot: "",
    newTimeSlot: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/", formData);
      alert("Appointment modified successfully!");
    } catch (error: any) {
      alert(error.response?.data?.error || "Error modifying appointment");
    }
  };

  return (
    <div className="modify-appointment">
      <h2 className="page-title">Modify Appointment</h2>
      <form onSubmit={handleSubmit} className="modify-appointment-form">
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
        <label htmlFor="originalTimeSlot">Original Time Slot</label>
        <input
          type="datetime-local"
          name="originalTimeSlot"
          id="originalTimeSlot"
          placeholder="Original Time Slot"
          value={formData.originalTimeSlot}
          onChange={handleChange}
          required
        />
        <label htmlFor="newTimeSlot">New Time Slot</label>
        <input
          type="datetime-local"
          name="newTimeSlot"
          id="newTimeSlot"
          placeholder="New Time Slot"
          value={formData.newTimeSlot}
          onChange={handleChange}
          required
        />
        <button type="submit">Modify Appointment</button>
      </form>
    </div>
  );
};

export default ModifyAppointment;
