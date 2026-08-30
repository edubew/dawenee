import React from "react";
import { Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import OurWork from "./pages/OurWork/OurWork";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Quote from "./pages/Quote/Quote";
import QuoteConfirmation from "./pages/QuoteConfirmation/QuoteConfirmation";
import Payment from "./pages/Payment/Payment";
import RouteSeo from "./components/Seo/RouteSeo";

const whatsappNumber = "254715784287";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hello Dawenee Decor & Events, I would like to know more about your services."
)}`;

function App() {
  return (
    <>
      <RouteSeo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/quote/confirmation" element={<QuoteConfirmation />} />
        <Route path="/quote/payment" element={<Payment />} />
      </Routes>

      <a
        className="whatsapp-widget"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Dawenee on WhatsApp"
      >
        <FaWhatsapp />
        <span className="whatsapp-widget__prompt">
          <small>Planning something special?</small>
          <strong>WhatsApp us</strong>
        </span>
      </a>
    </>
  );
}

export default App;
