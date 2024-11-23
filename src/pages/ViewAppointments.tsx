import React, { FormEvent, useState } from "react";
import { api } from "../config/api";

const ViewAppointments: React.FC = () => {
  const [email, setEmail] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!email?.length) {
      return alert("Please enter your email id");
    }
    try {
      const response = await api.get(`/${email}`);
      setAppointments(response.data);
    } catch (error: any) {
      alert(error.response?.data?.error || "Error fetching appointment");
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (email: string, timeSlot: string) => {
    if (!email || !timeSlot) {
      alert("Invalid appointment details");
      return;
    }
    try {
      await api.delete(`/`, { data: { email, timeSlot } });
      setAppointments((prev) =>
        prev.filter(
          (appointment) =>
            !(appointment.email === email && appointment.timeSlot === timeSlot)
        )
      );
    } catch (err) {
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  return (
    <div className="view-appointments">
      <h2 className="page-title">View Your Appointment</h2>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={(e) => handleSearch(e)}>Search</button>
      </form>
      {appointments.map((appointment: any, index: number) => (
        <div className="appointment-details" key={index}>
          <p>
            <strong>Doctor:</strong> {appointment.doctorName}
          </p>
          <p>
            <strong>Time Slot:</strong> {appointment.timeSlot}
          </p>
          <p>
            <strong>Patient:</strong> {appointment.firstName}{" "}
            {appointment.lastName}
          </p>
          <button
            className="cancel-btn"
            onClick={() =>
              cancelAppointment(appointment.email, appointment.timeSlot)
            }
          >
            Cancel Appointment
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewAppointments;
