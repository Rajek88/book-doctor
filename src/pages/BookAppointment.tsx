import React from "react";
import AppointmentForm from "../components/AppointmentForm";

const BookAppointment: React.FC = () => {
  return (
    <div className="book-appointment">
      <h2 className="page-title">Book an Appointment</h2>
      <AppointmentForm onSuccess={() => window.location.reload()} />
    </div>
  );
};

export default BookAppointment;
