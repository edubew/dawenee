import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking/Booking";
import Portfolio from "./pages/Portfolio/Portfolio";
import Services from "./pages/Services/Services";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/services" element={<Services />} />
      <Route path="/quote" element={<Home />} />
    </Routes>
  );
}

export default App;
