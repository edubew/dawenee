import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck, FaWhatsapp } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import Cta from "../../components/Footer/Cta";
import Footer from "../../components/Footer/Footer";
import balloonImage from "../../assets/images/servicesPage/balloon-backdrop.jpg";
import floralImage from "../../assets/images/servicesPage/floral-designs.jpg";
import tableImage from "../../assets/images/servicesPage/table-setup.jpg";
import tentImage from "../../assets/images/servicesPage/tent-furniture.jpg";
import kidsImage from "../../assets/images/servicesPage/kids-party.jpg";
import picnicImage from "../../assets/images/servicesPage/picnic.jpg";
import "./Services.scss";

const services = [
  {
    number: "01",
    title: "Balloon installations & backdrops",
    description:
      "Statement focal points designed around your celebration, colour palette and space.",
    details: ["Balloon garlands and arches", "Custom backdrop styling", "Welcome and photo areas"],
    image: balloonImage,
    alt: "Elegant balloon installation and event backdrop",
  },
  {
    number: "02",
    title: "Floral styling",
    description:
      "Fresh or faux florals arranged to bring softness, colour and cohesion to your event.",
    details: ["Table and floor arrangements", "Arch and entrance florals", "Colour-matched floral details"],
    image: floralImage,
    alt: "Floral arrangement styled for a celebration",
  },
  {
    number: "03",
    title: "Tablescapes & place settings",
    description:
      "Layered table styling that makes every guest feel considered, from linen to the final detail.",
    details: ["Linens, runners and napkins", "Centre pieces and candles", "Crockery and place settings"],
    image: tableImage,
    alt: "Styled event table with coordinated place settings",
  },
  {
    number: "04",
    title: "Tent & furniture setups",
    description:
      "Comfortable, polished event spaces with practical pieces styled to suit the occasion.",
    details: ["Tent styling and draping", "Guest seating and tables", "Lounge and feature furniture"],
    image: tentImage,
    alt: "Tent and furniture arranged for an outdoor event",
  },
  {
    number: "05",
    title: "Kids' parties",
    description:
      "Playful, memorable celebrations brought to life with age-appropriate themes and details.",
    details: ["Personalised themes", "Children's tables and seating", "Cake and activity areas"],
    image: kidsImage,
    alt: "Colourful themed children's party setup",
  },
  {
    number: "06",
    title: "Luxury picnics",
    description:
      "Relaxed outdoor celebrations with the comfort, beauty and finishing touches of an intimate event.",
    details: ["Low tables and soft seating", "Styled place settings", "Florals and ambient details"],
    image: picnicImage,
    alt: "Luxury picnic setup with cushions and low tables",
  },
];

const process = [
  ["Discover", "Tell us your date, venue, guest count and the feeling you want to create."],
  ["Design", "We shape a cohesive concept and tailor the details to your priorities and budget."],
  ["Deliver", "Our team handles setup and styling so you can arrive ready to celebrate."],
];

function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-page min-h-screen">
      <Navbar />

      <main>
        <section className="services-hero">
          <div className="container services-hero__inner">
            <div className="services-hero__copy">
              <span className="services-hero__eyebrow">Our services</span>
              <h1>Not just décor. <em>The feeling your guests take home.</em></h1>
              <p>
                Choose one unforgettable focal point or let us shape the whole
                experience. Every detail works toward a celebration that feels like you.
              </p>
              <div className="services-hero__actions">
                <Link to="/quote" className="btn btn--primary">
                  Build my event estimate <FaArrowRight />
                </Link>
                <a href="#service-collection" className="services-hero__explore">
                  Explore our services
                </a>
              </div>
            </div>

            <div className="services-hero__visual" aria-hidden="true">
              <img src={tableImage} alt="" className="services-hero__image services-hero__image--main" />
              <img src={floralImage} alt="" className="services-hero__image services-hero__image--accent" />
              <span className="services-hero__seal">Styled<br />in Nairobi</span>
            </div>
          </div>
        </section>

        <section className="service-collection" id="service-collection">
          <div className="container">
            <div className="section-header">
              <span className="section-header__eyebrow">What we create</span>
              <h2 className="section-header__title">Every detail, <em>beautifully considered</em></h2>
              <p className="section-header__subtitle">
                Begin with the moments your guests will notice and the feeling
                you want them to remember. We will help the details belong together.
              </p>
            </div>

            <div className="service-collection__grid">
              {services.map((service) => (
                <article className="service-detail" key={service.number}>
                  <div className="service-detail__image-wrap">
                    <img src={service.image} alt={service.alt} className="service-detail__image" />
                    <span className="service-detail__number">{service.number}</span>
                  </div>
                  <div className="service-detail__content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul>
                      {service.details.map((detail) => (
                        <li key={detail}><FaCheck /> {detail}</li>
                      ))}
                    </ul>
                    <Link to="/quote" className="service-detail__link">
                      Include in my quote <FaArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services-process">
          <div className="container services-process__inner">
            <div className="services-process__intro">
              <span className="services-process__eyebrow">Our approach</span>
              <h2>Keep the anticipation. <em>Leave us the pressure.</em></h2>
              <p>Clear choices, personal guidance and a team that carries the visual details from idea to setup.</p>
              <a
                href="https://wa.me/254715784287?text=Hello%20Dawenee%2C%20I%27d%20like%20to%20discuss%20styling%20my%20event."
                target="_blank"
                rel="noreferrer"
                className="services-process__whatsapp"
              >
                <FaWhatsapp /> Talk through your ideas
              </a>
            </div>
            <ol className="services-process__steps">
              {process.map(([title, description], index) => (
                <li key={title}>
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </div>
  );
}

export default Services;
