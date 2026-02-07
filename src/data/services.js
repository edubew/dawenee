import tableSetupsImg from "../assets/images/services/table-setups.jpg";
import balloonBackdropsImg from "../assets/images/services/balloon-backdrops.jpg";
import floralDesignsImg from "../assets/images/services/floral-designs.jpg";
import tentSetupsImg from "../assets/images/services/tent-setups.jpg";
import kidsPartiesImg from "../assets/images/services/kids-parties.jpg";
import picnicsImg from "../assets/images/services/picnics.jpg";

const services = [
  {
    id: 1,
    title: "Table Setups",
    description:
      "From intimate dinners to grand receptions, we create stunning tablescapes that set the mood and wow your guests.",
    image: tableSetupsImg,
    icon: "🍽️", // Optional fallback if image doesn't load
  },
  {
    id: 2,
    title: "Balloon Backdrops",
    description:
      "Statement balloon installations for photos, stages, and entrances. Bold colors or soft pastels — we bring your vision to life.",
    image: balloonBackdropsImg,
    icon: "🎈",
  },
  {
    id: 3,
    title: "Floral Designs",
    description:
      "Fresh and silk floral arrangements that add elegance and natural beauty to every corner of your celebration.",
    image: floralDesignsImg,
    icon: "🌸",
  },
  {
    id: 4,
    title: "Tent & Furniture Setups",
    description:
      "Complete event infrastructure from elegant tents to comfortable seating. We handle the heavy lifting so you don't have to.",
    image: tentSetupsImg,
    icon: "⛺",
  },
  {
    id: 5,
    title: "Kids Parties",
    description:
      "Magical celebrations designed for little ones. From whimsical themes to safe, age-appropriate decor that sparks joy.",
    image: kidsPartiesImg,
    icon: "🎪",
  },
  {
    id: 6,
    title: "Picnics & Outdoor Events",
    description:
      "Dreamy al fresco setups for intimate gatherings. Boho picnics, garden brunches, and outdoor celebrations that feel effortless.",
    image: picnicsImg,
    icon: "🧺",
  },
];

export default services;
