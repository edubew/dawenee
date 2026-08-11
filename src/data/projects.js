import dinnerPartyImg from "../assets/images/projects/dinner-party.jpg";
import engagementImg from "../assets/images/projects/engagement.jpg";
import graduationImg from "../assets/images/projects/graduation.jpg";
import picnicImg from "../assets/images/projects/picnic.jpg";
import kidsBirthdayImg from "../assets/images/projects/kids-birthday.jpg";
import babyShowerImg from "../assets/images/projects/baby-shower.jpg";

// const projects = [
//   {
//     id: 1,
//     title: "Elegant Candlelit Dinner Party",
//     eventType: "Birthday",
//     image: dinnerPartyImg,
//     guestCount: 15,
//     priceRange: "From Kes 27,670",
//   },
//   {
//     id: 2,
//     title: "Tropical Birthday Bash",
//     eventType: "Engagement",
//     image: engagementImg,
//     guestCount: 30,
//     priceRange: "From Kes 42,900",
//   },
//   {
//     id: 3,
//     title: "Elegant Graduation Party",
//     eventType: "Graduation",
//     image: graduationImg,
//     guestCount: 20,
//     priceRange: "From Kes 34,900",
//   },
//   {
//     id: 4,
//     title: "Intimate Picnic Setup",
//     eventType: "Picnic",
//     image: picnicImg,
//     guestCount: 10,
//     priceRange: "From Kes 21,000",
//   },
//   {
//     id: 5,
//     title: "Princess Birthday Party",
//     eventType: "Kid's Party",
//     image: kidsBirthdayImg,
//     guestCount: 40,
//     priceRange: "From Kes 35,000",
//   },
//   {
//     id: 6,
//     title: "Elegant Baby Shower",
//     eventType: "Baby Shower",
//     image: babyShowerImg,
//     guestCount: 35,
//     priceRange: "From Kes 30,000",
//   },
// ];

// export default projects;
// Each project needs: id, title, eventType, image, alt, and size.
// `size` controls the masonry row span: "tall" | "med" | "short".
// For best results, alternate sizes so the grid doesn't feel uniform —
// aim for roughly 2 "tall", 2 "med", and 2 "short" per row of 3 on desktop.

// import work1 from "../assets/images/work/work-1.jpg";
// import work2 from "../assets/images/work/work-2.jpg";
// import work3 from "../assets/images/work/work-3.jpg";
// import work4 from "../assets/images/work/work-4.jpg";
// import work5 from "../assets/images/work/work-5.jpg";
// import work6 from "../assets/images/work/work-6.jpg";

const projects = [
  {
    id: 1,
    title: "Milestone 30th, Lavington",
    eventType: "Birthday",
    image: dinnerPartyImg,
    alt: "Balloon backdrop with floral details for a 30th birthday",
    size: "tall",
  },
  {
    id: 2,
    title: "Room reveal, Kilimani",
    eventType: "Surprise Setup",
    image: engagementImg,
    alt: "Birthday surprise room with balloon decorations",
    size: "med",
  },
  {
    id: 3,
    title: "Anniversary picnic, Karura",
    eventType: "Picnic",
    image: graduationImg,
    alt: "Soft and intimate picnic setup",
    size: "short",
  },
  {
    id: 4,
    title: "Product launch, Westlands",
    eventType: "Corporate",
    image: picnicImg,
    alt: "Corporate event balloon and table styling",
    size: "short",
  },
  {
    id: 5,
    title: "Garden brunch, Karen",
    eventType: "Bridal Shower",
    image: kidsBirthdayImg,
    alt: "Bridal shower garden table setup",
    size: "tall",
  },
  {
    id: 6,
    title: "Welcome party, Runda",
    eventType: "Baby Shower",
    image: babyShowerImg,
    alt: "Baby shower balloon backdrop and decor",
    size: "med",
  },
];

export default projects;