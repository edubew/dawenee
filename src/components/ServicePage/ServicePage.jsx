// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./ServicePage.scss";
// import { services } from "../../data/servicesData";

// function ServicePage() {
//   const [expandedService, setExpandedService] = useState(null);

//   const toggleService = (serviceId) => {
//     setExpandedService(expandedService === serviceId ? null : serviceId);
//   };

//   return (
//     <div className="services">
//       <div className="services__cards">
//         {services.map((service) => (
//           <article key={service.id} className="service-card">
//             <div className="service-card__image-wrapper">
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className="service-card__image"
//               />
//             </div>

//             <div className="service-card__content">
//               <h3 className="service-card__title">{service.title}</h3>
//               <p className="service-card__short-desc">
//                 {service.shortDescription}
//               </p>

//               <button
//                 onClick={() => toggleService(service.id)}
//                 className="service-card__toggle"
//                 aria-expanded={expandedService === service.id}
//               >
//                 {expandedService === service.id ? "Show Less" : "Learn More"}
//                 <span
//                   className={`service-card__toggle-icon ${expandedService === service.id ? "service-card__toggle-icon--open" : ""}`}
//                 >
//                   ▼
//                 </span>
//               </button>

//               {/* Expanded Content */}
//               {expandedService === service.id && (
//                 <div className="service-card__expanded">
//                   <p className="service-card__full-desc">
//                     {service.fullDescription}
//                   </p>

//                   {/* Features List */}
//                   <div className="service-card__details">
//                     <div className="service-card__section">
//                       <h4 className="service-card__section-title">
//                         What's Included:
//                       </h4>
//                       <ul className="service-card__features">
//                         {service.features.map((feature, index) => (
//                           <li key={index}>{feature}</li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Popular For */}
//                     <div className="service-card__section">
//                       <h4 className="service-card__section-title">
//                         Popular for:
//                       </h4>
//                       <div className="service-card__tags">
//                         {service.popularFor.map((tag, index) => (
//                           <span key={index} className="service-card__tag">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Pricing and setup time */}
//                     <div className="service-card__info">
//                       <div className="service-card__info-item">
//                         <span className="service-card__info-label">
//                           Starting From:
//                         </span>
//                         <span className="service-card__info-value">
//                           {service.priceRange}
//                         </span>
//                       </div>
//                       <div className="service-card__info-item">
//                         <span className="service-card__info-label">
//                           Setup Time:
//                         </span>
//                         <span className="service-card__info-value">
//                           {service.setupTime}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <Link to="/booking" className="service-card__cta">
//                     Book This Service
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ServicePage;
