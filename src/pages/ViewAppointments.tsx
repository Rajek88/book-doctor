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

  return (
    <div className="view-appointments">
      <h2 className="page-title">View Appointment</h2>
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
        </div>
      ))}
    </div>
  );
};

export default ViewAppointments;
