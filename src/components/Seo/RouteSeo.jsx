import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import socialImage from "../../assets/images/hero/hero-1.jpg";

const DEFAULT_DESCRIPTION =
  "Dawenee Decor & Events creates thoughtful event styling for weddings, birthdays, graduations, picnics and celebrations in Nairobi, Kenya.";

const routeMeta = {
  "/": {
    title: "Event Decor & Styling in Nairobi | Dawenee",
    description: DEFAULT_DESCRIPTION,
  },
  "/services": {
    title: "Event Styling Services in Nairobi | Dawenee",
    description:
      "Explore balloon installations, floral styling, tablescapes, tent decor, kids parties and luxury picnic styling from Dawenee in Nairobi.",
  },
  "/our-work": {
    title: "Nairobi Event Decor Portfolio | Dawenee",
    description:
      "See weddings, birthdays, graduations and dinner celebrations styled by Dawenee Decor & Events across Nairobi.",
  },
  "/about": {
    title: "About Dawenee | Nairobi Event Styling Team",
    description:
      "Meet Dawenee Decor & Events, the Nairobi styling team creating thoughtful, personal and memorable celebrations.",
  },
  "/contact": {
    title: "Contact Dawenee Decor & Events Nairobi",
    description:
      "Talk to Dawenee about event decor and styling in Nairobi. Share your date, venue, guest count and celebration ideas.",
  },
  "/quote": {
    title: "Build Your Event Decor Estimate | Dawenee",
    description:
      "Create a starting estimate for your Nairobi event decor and styling in a few guided steps.",
  },
  "/quote/confirmation": {
    title: "Your Quote | Dawenee Decor & Events",
    description: "Review the next steps for your Dawenee event styling request.",
    noindex: true,
  },
  "/quote/payment": {
    title: "Secure Your Booking | Dawenee Decor & Events",
    description: "Complete the next step for your Dawenee event booking.",
    noindex: true,
  },
};

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
}

function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routeMeta[pathname] || {
      title: "Page Not Found | Dawenee Decor & Events",
      description: DEFAULT_DESCRIPTION,
      noindex: true,
    };
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${pathname === "/" ? "/" : pathname}`;
    const imageUrl = new URL(socialImage, origin).href;

    document.title = meta.title;
    setMeta('meta[name="description"]', { name: "description", content: meta.description });
    setMeta('meta[name="robots"]', {
      name: "robots",
      content: meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    });
    setMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: meta.description });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: meta.description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    let schema = document.head.querySelector("#dawenee-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "dawenee-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Dawenee Decor & Events",
      description: DEFAULT_DESCRIPTION,
      url: origin,
      image: imageUrl,
      telephone: "+254715784287",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      areaServed: { "@type": "City", name: "Nairobi" },
      sameAs: ["https://instagram.com/dawenee_decor"],
    });
  }, [pathname]);

  return null;
}

export default RouteSeo;
