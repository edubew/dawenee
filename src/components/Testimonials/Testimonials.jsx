import React from "react";
import { BerrySprig } from "../Botanicals/Botanicals";
import "./Testimonials.scss";

const reviews = [
  {
    id: 1,
    text: "Dawenee made our wedding day absolutely perfect — the attention to detail was incredible and everything looked exactly like we imagined.",
    name: "Jennifer & Mike",
    event: "Wedding · December 2025",
  },
  {
    id: 2,
    text: "Best investment for my daughter's birthday. The setup was stunning and stayed within budget — the team was so easy to work with.",
    name: "Mrs. Kamau",
    event: "Birthday Party · January 2026",
  },
  {
    id: 3,
    text: "Quick turnaround for our last-minute corporate event — they pulled off a miracle and it looked amazing.",
    name: "David O.",
    event: "Corporate Event · November 2025",
  },
];

function Testimonials() {
  return (
    <section className="reviews">
      <BerrySprig
        className="reviews__botanical"
        style={{
          position: "absolute",
          top: "5%",
          right: "-1.5rem",
          width: "200px",
          transform: "scaleX(-1)",
        }}
        opacity={0.14}
      />

      <div className="container reviews__grid">
        <div className="reviews__stat">
          <span className="reviews__eyebrow">The feeling after the reveal</span>
          <h2 className="reviews__title">
            The details fade. <em>How it felt stays.</em>
            <br />
            Hear it from our clients.
          </h2>
          <div className="reviews__rating">
            <span className="reviews__rating-number">4.9</span>
            <span className="reviews__rating-stars">★★★★★</span>
          </div>
          <p className="reviews__rating-label">
            Average rating from 30+ celebrations styled
          </p>
        </div>

        <div className="reviews__cards">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <p className="review-card__text">"{review.text}"</p>
              <div className="review-card__author">
                <div className="review-card__avatar" aria-hidden="true">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="review-card__name">{review.name}</div>
                  <div className="review-card__event">{review.event}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
