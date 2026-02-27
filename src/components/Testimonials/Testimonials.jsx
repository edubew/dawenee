import React from "react";
import "./Testimonials.scss";

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="testimonials__title">What Our Clients Say</h2>

        <div className="testimonials__grid">
          <div className="testimonial-card">
            <div className="testimonial-card__stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-card__text">
              "Dawenee made our wedding day absolutely perfect! The attention to
              detail was incredible, and everything looked exactly like we
              imagined. Highly recommend!"
            </p>
            <div className="testimonial-card__author">
              <strong>Jennifer & Mike</strong>
              <span>Wedding, December 2025</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-card__stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-card__text">
              "Best investment for my daughter's birthday party. The setup was
              stunning and stayed within our budget. The team was professional
              and so easy to work with!"
            </p>
            <div className="testimonial-card__author">
              <strong>Mrs. Kamau</strong>
              <span>Birthday Party, January 2026</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-card__stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-card__text">
              "Quick turnaround for our last-minute corporate event. They pulled
              off a miracle and it looked amazing. Will definitely use them
              again!"
            </p>
            <div className="testimonial-card__author">
              <strong>David O.</strong>
              <span>Corporate Event, November 2025</span>
            </div>
          </div>
        </div>

        <div className="testimonials__rating">
          <span className="testimonials__rating-number">4.9/5</span>
          <span className="testimonials__rating-text">
            from 30+ happy clients
          </span>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
