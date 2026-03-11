import dinnerPartyImg from "../assets/images/projects/dinner-party.jpg";
import engagementImg from "../assets/images/projects/engagement.jpg";
import graduationImg from "../assets/images/projects/graduation.jpg";
import picnicImg from "../assets/images/projects/picnic.jpg";
import kidsBirthdayImg from "../assets/images/projects/kids-birthday.jpg";
import babyShowerImg from "../assets/images/projects/baby-shower.jpg";

const projects = [
  {
    id: 1,
    title: "Elegant Candlelit Dinner Party",
    eventType: "Birthday",
    image: dinnerPartyImg,
    guestCount: 15,
    priceRange: "From Kes 27,670",
  },
  {
    id: 2,
    title: "Tropical Birthday Bash",
    eventType: "Engagement",
    image: engagementImg,
    guestCount: 30,
    priceRange: "From Kes 42,900",
  },
  {
    id: 3,
    title: "Elegant Graduation Party",
    eventType: "Graduation",
    image: graduationImg,
    guestCount: 20,
    priceRange: "From Kes 34,900",
  },
  {
    id: 4,
    title: "Intimate Picnic Setup",
    eventType: "Picnic",
    image: picnicImg,
    guestCount: 10,
    priceRange: "From Kes 21,000",
  },
  {
    id: 5,
    title: "Princess Birthday Party",
    eventType: "Kid's Party",
    image: kidsBirthdayImg,
    guestCount: 40,
    priceRange: "From Kes 35,000",
  },
  {
    id: 6,
    title: "Elegant Baby Shower",
    eventType: "Baby Shower",
    image: babyShowerImg,
    guestCount: 35,
    priceRange: "From Kes 30,000",
  },
];

export default projects;
