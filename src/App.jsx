import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Booking from "./pages/Booking/Booking";
import Quote from "./pages/Quote/Quote";
import QuoteReview from "./pages/QuoteReview/QuoteReview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/quote" element={<Quote />} />
      <Route path="/quote/review" element={<QuoteReview />} />
    </Routes>
  );
}

export default App;
