import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import Cta from "../../components/Footer/Cta";
import Footer from "../../components/Footer/Footer";
import storyImage from "../../assets/images/portfolio/dr-nasteha-graduation.jpg";
import detailImage from "../../assets/images/portfolio/burgundy-table-setting.jpg";
import celebrationImage from "../../assets/images/portfolio/wedding-balloon-backdrop.jpg";
import "./About.scss";

const reasons = [
  {
    number: "01",
    title: "Thoughtful styling",
    text: "We do not simply fill a space. Colours, textures and finishing touches are considered together so your event feels intentional.",
  },
  {
    number: "02",
    title: "Clear guidance",
    text: "From your first estimate to the final setup, we make the choices, costs and next steps easier to understand.",
  },
  {
    number: "03",
    title: "Personal attention",
    text: "Your celebration is never treated like a template. We shape the styling around your vision, venue and occasion.",
  },
];

const values = [
  ["Care", "We treat the smallest detail as part of the whole experience."],
  ["Creativity", "We translate ideas into a look that feels fresh and personal."],
  ["Reliability", "We plan carefully, communicate clearly and show up prepared."],
  ["Warmth", "Celebrations are personal, and working with us should feel that way too."],
];

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page min-h-screen">
      <Navbar />

      <main>
        <section className="about-hero">
          <div className="container about-hero__inner">
            <div className="about-hero__copy">
              <span className="about-hero__eyebrow">About Dawenee</span>
              <h1>For people who believe <em>how it feels matters.</em></h1>
              <p>
                We help thoughtful hosts turn care into something guests can
                see, feel and remember—through spaces made for their story.
              </p>
              <div className="about-hero__actions">
                <Link to="/quote" className="btn btn--primary">Build my event estimate <FaArrowRight /></Link>
                <Link to="/services" className="btn btn--secondary">Explore services</Link>
              </div>
            </div>

            <div className="about-hero__visual">
              <img src={storyImage} alt="A graduation celebration styled by Dawenee Decor and Events in Nairobi" />
              <div className="about-hero__card">
                <span>Based in</span>
                <strong>Nairobi, Kenya</strong>
                <p>Styling intimate gatherings and joyful celebrations.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-story">
          <div className="container about-story__inner">
            <div className="about-story__images">
              <img src={detailImage} alt="Burgundy and gold tablescape carefully styled by Dawenee" />
              <span>Every detail<br />tells the story</span>
            </div>
            <div className="about-story__copy">
              <span className="about-story__eyebrow">Our story</span>
              <h2>We believe a beautiful space can change <em>how a moment feels.</em></h2>
              <p>
                Dawenee Decor &amp; Events was built around a simple idea: your
                celebration should feel unmistakably yours. Not a copy of
                someone else’s event, and not decoration for decoration’s sake.
              </p>
              <p>
                We listen first, then bring together colour, florals, balloons,
                furniture and personal details in a way that feels cohesive.
                Whether the gathering is intimate or grand, the same care goes
                into making guests feel welcomed and the occasion feel special.
              </p>
              <Link to="/contact" className="about-story__link">Start a conversation <FaArrowRight /></Link>
            </div>
          </div>
        </section>

        <section className="about-why">
          <div className="container">
            <div className="about-why__intro">
              <div>
                <span className="about-why__eyebrow">Why Dawenee</span>
                <h2>Beautiful is only the beginning. <em>It should feel intentional.</em></h2>
              </div>
              <p>
                From the first idea to the final setup, we care about the
                details that turn a decorated space into an experience worth remembering.
              </p>
            </div>
            <div className="about-why__grid">
              {reasons.map((reason) => (
                <article key={reason.number}>
                  <span>{reason.number}</span><h3>{reason.title}</h3><p>{reason.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-values">
          <div className="container about-values__inner">
            <div className="about-values__copy">
              <span className="about-values__eyebrow">What guides us</span>
              <h2>Our values show up in <em>how we work.</em></h2>
              <div className="about-values__list">
                {values.map(([title, text]) => (
                  <div key={title}><FaCheck /><div><h3>{title}</h3><p>{text}</p></div></div>
                ))}
              </div>
            </div>
            <img src={celebrationImage} alt="Elegant wedding balloon backdrop created by Dawenee" />
          </div>
        </section>

        <section className="about-approach">
          <div className="container about-approach__inner">
            <span>Listen</span><i /><span>Design</span><i /><span>Style</span><i /><span>Celebrate</span>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </div>
  );
}

export default About;
