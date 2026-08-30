import React from "react";
import { Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Quote from "./pages/Quote/Quote";
import QuoteReview from "./pages/QuoteReview/QuoteReview";
import QuoteConfirmation from "./pages/QuoteConfirmation/QuoteConfirmation";
import Payment from "./pages/Payment/Payment";
import SharedQuote from "./pages/SharedQuote/SharedQuote";

const whatsappNumber = "254715784287";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hello Dawenee Decor & Events, I would like to know more about your services."
)}`;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/quote/review" element={<QuoteReview />} />
        <Route path="/quote/confirmation" element={<QuoteConfirmation />} />
        <Route path="/quote/payment" element={<Payment />} />
        <Route path="/quote/view" element={<SharedQuote />} />
      </Routes>

      <a
        className="whatsapp-widget"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Dawenee on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </>
  );
}

export default App;
