import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router";
import BookAppointment from "./BookAppointment";
import ViewAppointments from "./ViewAppointments";
import ModifyAppointment from "./ModifyAppointment";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const currentPath = location.pathname;

  useEffect(() => {
    navigate("/book");
  }, []);

  return (
    <div className="page">
      <h1 className="app-title">
        <span style={{ color: "red" }}>+</span> Doctor Appointment Booking{" "}
        <span style={{ color: "red" }}>+</span>
      </h1>
      <nav>
        <Link className={currentPath === "/book" ? "active" : ""} to="/book">
          Book Appointment
        </Link>
        <Link className={currentPath === "/view" ? "active" : ""} to="/view">
          View Appointments
        </Link>
        <Link
          className={currentPath === "/modify" ? "active" : ""}
          to="/modify"
        >
          Modify Appointment
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/view" element={<ViewAppointments />} />
          <Route path="/modify" element={<ModifyAppointment />} />
        </Routes>
      </main>
    </div>
  );
};

export default Home;
