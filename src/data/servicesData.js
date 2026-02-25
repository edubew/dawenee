import balloonBackdrop from "../assets/images/servicesPage/balloon-backdrop.jpg";
import tableSetup from "../assets/images/servicesPage/table-setup.jpg";
import kidsParty from "../assets/images/servicesPage/kids-party.jpg";
import tentFurniture from "../assets/images/servicesPage/tent-furniture.jpg";
import picnic from "../assets/images/servicesPage/picnic.jpg";
import floralDesigns from "../assets/images/servicesPage/floral-designs.jpg";

export const services = [
  {
    id: 1,
    title: "Baloon Backdrops",
    slug: "balloon-backdrops",
    shortDescription:
      "Instagram-worthy photo moments with stunning balloon installations",
    fullDescription:
      "Transform any space with our custom balloon backdrops. From organic balloon arches to geometric installations, we create show-stopping focal points that guests can't stop photographing. Perfect for birthdays, weddings, corporate events, or any celebration that deserves the wow factor.",
    image: balloonBackdrop,
    features: [
      "Organic balloon garlands",
      "Geometric balloon walls",
      "Custom color palettes",
      "Photo backdrop installations",
      "Balloon columns and arches",
      "Delivery, setup, and breakdown included",
    ],
    popularFor: ["Weddings", "Birthdays", "Corporate Events", "Baby Showers"],
    priceRange: "From KES 15,000",
    setupTime: "2-3 hours",
    featured: true,
  },
  {
    id: 2,
    title: "Table Setups",
    slug: "table-setups",
    shortDescription: "Elegant dining arrangements that set the perfect tone",
    fullDescription:
      "Every detail matters when it comes to table settings. We design and style tablescapes that elevate your event, from intimate dinners to grand celebrations. Linens, centerpieces, place settings, and finishing touches all curated to match your vision perfectly.",
    image: tableSetup,
    features: [
      "Custom tablescapes and centerpieces",
      "Premium linens and runners",
      "Place settings and chargers",
      "Floral arrangements",
      "Candlelight and ambient elements",
      "Coordinated color schemes",
    ],
    popularFor: [
      "Weddings",
      "Corporate Dinners",
      "Engagement Parties",
      "Anniversary Celebrations",
    ],
    priceRange: "From KES 20,000",
    setupTime: "3-4 hours",
    featured: true,
  },
  {
    id: 3,
    title: "Kids Parties",
    slug: "kids-parties",
    shortDescription: "Magical themed parties that spark joy and wonder",
    fullDescription:
      "We bring children's imaginations to life with fully themed party setups. From princess castles to superhero headquarters, pirate ships to unicorn wonderlands - we handle every detail so parents can enjoy the celebration. Age-appropriate decor, activities, and entertainment all coordinated perfectly.",
    image: kidsParty,
    features: [
      "Fully themed decorations",
      "Age-appropriate activities",
      "Balloon bouquets and installations",
      "Dessert table styling",
      "Party favors coordination",
      "Character-themed setups",
    ],
    popularFor: ["Birthday Parties", "School Events", "Family Celebrations"],
    priceRange: "From KES 12,000",
    setupTime: "2-3 hours",
    featured: false,
  },
  {
    id: 4,
    title: "Birthday Celebrations",
    slug: "birthdays",
    shortDescription: "Milestone moments designed to be unforgettable",
    fullDescription:
      "Whether it's a sweet sixteen, dirty thirty, or golden fifty, we make birthdays extraordinary. Sophisticated decor for adult celebrations or playful themes for kids - every birthday deserves to be celebrated in style. We customize every element to reflect the personality of the guest of honor.",
    image: balloonBackdrop,
    features: [
      "Age-appropriate theme design",
      "Personalized decor elements",
      "Photo booth setups",
      "Dessert and cake table styling",
      "Balloon installations",
      "Custom signage and banners",
    ],
    popularFor: [
      "Milestone Birthdays",
      "Surprise Parties",
      "Themed Celebrations",
    ],
    priceRange: "From KES 18,000",
    setupTime: "2-4 hours",
    featured: true,
  },
  {
    id: 5,
    title: "Graduation Celebrations",
    slug: "graduations",
    shortDescription: "Honor achievements with elegant, proud celebrations",
    fullDescription:
      "Academic milestones deserve recognition in style. We create sophisticated graduation setups that honor the achievement while celebrating the future. School colors, personalized elements, photo displays, and elegant table settings all come together to make graduates feel truly special.",
    image: tentFurniture,
    features: [
      "School color coordination",
      "Photo timeline displays",
      "Elegant table settings",
      "Diploma and achievement showcases",
      "Guest book stations",
      "Champagne wall installations",
    ],
    popularFor: [
      "High School Graduations",
      "University Graduations",
      "Professional Certifications",
    ],
    priceRange: "From KES 16,000",
    setupTime: "2-3 hours",
    featured: false,
  },
  {
    id: 6,
    title: "Tent & Furniture Setups",
    slug: "tent-furniture",
    shortDescription: "Complete event infrastructure for any venue",
    fullDescription:
      "Transform any outdoor space into an elegant event venue. We provide and set up tents, tables, chairs, and furniture to create comfortable, stylish gathering spaces. From intimate garden parties to large outdoor weddings, we have the inventory and expertise to bring your vision to life.",
    image: tentFurniture,
    features: [
      "Tent rentals and installation",
      "Premium furniture selection",
      "Lounge area setups",
      "Dance floor installation",
      "Lighting arrangements",
      "Weather protection solutions",
    ],
    popularFor: [
      "Weddings",
      "Corporate Events",
      "Large Gatherings",
      "Garden Parties",
    ],
    priceRange: "From KES 30,000",
    setupTime: "4-6 hours",
    featured: false,
  },
  {
    id: 7,
    title: "Picnics & Outdoor Events",
    slug: "picnics-outdoor",
    shortDescription: "Nature-inspired gatherings with luxury touches",
    fullDescription:
      "Experience the magic of outdoor dining with our curated picnic setups. Low seating arrangements, Moroccan rugs, scattered cushions, fresh flowers, and gourmet spreads - all perfectly styled for intimate gatherings or larger outdoor celebrations. We handle everything from setup to cleanup.",
    image: picnic,
    features: [
      "Low Moroccan seating",
      "Layered rugs and cushions",
      "Fresh floral arrangements",
      "Picnic basket styling",
      "Blanket and throw coordination",
      "Outdoor lighting for evening events",
    ],
    popularFor: [
      "Romantic Dates",
      "Family Gatherings",
      "Bridal Showers",
      "Small Weddings",
    ],
    priceRange: "From KES 10,000",
    setupTime: "1-2 hours",
    featured: true,
  },
  {
    id: 8,
    title: "Custom Requests",
    slug: "custom-requests",
    shortDescription:
      "Unique visions brought to life with personalized planning",
    fullDescription:
      "Have a specific vision that doesn't fit traditional categories? We love a creative challenge! From themed proposals to surprise celebrations, brand activations to unconventional gatherings - we work with you to design and execute truly one-of-a-kind events. No idea is too ambitious.",
    image: floralDesigns,
    features: [
      "Personalized consultation",
      "Custom theme development",
      "Unique prop sourcing",
      "Bespoke decor creation",
      "Flexible service packages",
      "Unlimited creative possibilities",
    ],
    popularFor: [
      "Proposals",
      "Brand Events",
      "Unique Celebrations",
      "Surprise Events",
    ],
    priceRange: "Custom Quote",
    setupTime: "Varies",
    featured: false,
  },
];
