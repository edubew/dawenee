import React, { useState } from "react";
import { BerrySprig } from "../Botanicals/Botanicals";

import "./Faq.scss";

const faqs = [
  {
    question: "What types of events do you decorate?",
    answer:
      "We style birthdays, baby showers, bridal showers, graduations, weddings, corporate events and other celebrations. If you're planning something a little different, tell us what you have in mind and we'll see how we can help.",
  },
  {
    question: "Do you only work in Nairobi?",
    answer:
      "Dawenee is based in Nairobi. Share your event location when requesting a quote and we'll confirm whether the venue can be accommodated.",
  },
  {
    question: "Is the online quote final?",
    answer:
      "Your online quote is an initial estimate based on the selections you make. We'll review your request, confirm availability and logistics, and discuss any custom requirements before your booking is finalised.",
  },
  {
    question: "Can I request something that isn't listed?",
    answer:
      "Absolutely. If you have a specific theme, colour palette, décor idea or special request that isn't listed in the quote builder, include it in your request and we'll review it with you.",
  },
  {
    question: "How much is the deposit?",
    answer:
      "A 50% deposit is required to secure a confirmed booking. The remaining balance is handled according to the agreed booking terms.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "The earlier the better, especially for weekends, weddings and larger events. We recommend reaching out as soon as you have your date and venue so we can check availability.",
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="faq" id="faq">
      <BerrySprig
        className="faq__botanical"
        style={{
          position: "absolute",
          top: "4%",
          left: "-1.5rem",
          width: "170px",
        }}
        opacity={0.08}
      />

      <div className="container">
        <div className="faq__header">
          <span className="faq__eyebrow">Good to know</span>

          <h2 className="faq__title">
            Before you plan,
            <br />
            <em>here's what you might be wondering.</em>
          </h2>

          <p className="faq__intro">
            A few answers to the questions we hear most often. Still unsure
            about something? We're happy to talk it through.
          </p>
        </div>

        <div className="faq__list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                className={`faq__item ${isOpen ? "faq__item--open" : ""}`}
                key={faq.question}
              >
                <button
                  type="button"
                  className="faq__question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>

                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className="faq__answer"
                  hidden={!isOpen}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq;
