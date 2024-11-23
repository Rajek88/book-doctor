import React, { useState } from "react";
import { api } from "../config/api";

interface Appointment {
  firstName: string;
  lastName: string;
  email: string;
  timeSlot: string;
  doctorName: string;
}

const ViewAppointmentsByDoctor: React.FC = () => {
  const [doctorName, setDoctorName] = useState<string>("Dr. Smith");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch appointments by doctor
  const fetchAppointments = async () => {
    if (!doctorName.trim()) {
      setError("Doctor name is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/doctor/${doctorName}`);
      setAppointments(response.data);
    } catch (err) {
      setError("Failed to fetch appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (email: string, timeSlot: string) => {
    if (!email || !timeSlot) {
      setError("Invalid appointment details");
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
      setError("Failed to cancel appointment. Please try again.");
    }
  };

  return (
    <div className="appointments-by-doctor">
      <h2 className="page-title">Appointments By Doctor</h2>
      {/* Search Appointments */}
      <form>
        <label htmlFor="doctorName">Doctor's Name</label>
        <select
          name="doctorName"
          id="doctorName"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        >
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Jones">Dr. Jones</option>
          <option value="Dr. Taylor">Dr. Taylor</option>
        </select>
        <button onClick={fetchAppointments} disabled={loading}>
          {loading ? "Loading..." : "View Appointments"}
        </button>
      </form>

      {/* Error Handling */}
      {error && <p className="error">{error}</p>}

      {/* Appointment List */}

      {appointments.map((appointment) => (
        <div
          key={`${appointment.email}-${appointment.timeSlot}`}
          className="appointment-details"
        >
          <p>
            <strong>Patient:</strong> {appointment.firstName}{" "}
            {appointment.lastName}
          </p>
          <p>
            <strong>Email:</strong> {appointment.email}
          </p>
          <p>
            <strong>Time Slot:</strong> {appointment.timeSlot}
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

export default ViewAppointmentsByDoctor;
