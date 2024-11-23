import React, { useEffect } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router";
import BookAppointment from "./BookAppointment";
import ViewAppointments from "./ViewAppointments";
import ModifyAppointment from "./ModifyAppointment";
import ViewAppointmentsByDoctor from "./ViewAppointsByDoctor";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname: currentPath } = location;
  //   console.log({ currentPath });

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
          className={currentPath === "/view-doctor" ? "active" : ""}
          to="/view-doctor"
        >
          View Appointments by Doctor
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
          <Route path="/view-doctor" element={<ViewAppointmentsByDoctor />} />
          <Route path="/modify" element={<ModifyAppointment />} />
        </Routes>
      </main>
    </div>
  );
};

export default Home;
