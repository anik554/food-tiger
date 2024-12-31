export const carouselImages = [
  "https://i.ibb.co.com/bR6nK8w/front-view-tasty-meat-soup-with-potatoes-greens-dark-desk-meal-meat-dish-sauce-140725-79118.jpg",
  "https://i.ibb.co.com/gSC3yJk/chicken-skewers-with-slices-apples-chili-2829-19992.jpg",
];

export const foods = 
[
  {
    id: 1,
    name: "Margherita Pizza",
    description:
      "Classic Italian pizza with fresh basil, mozzarella, and tomato sauce.",
    price: "$12.99",
    image: "https://i.ibb.co.com/hFbyZJx/Margherita-Pizza-5-1200.jpg",
  },
  {
    id: 2,
    name: "Sushi Platter",
    description: "An assortment of fresh sushi rolls and sashimi.",
    price: "$18.99",
    image:
      "https://i.ibb.co.com/pRs8f7V/13-07-2018-R-4-lat-50-sushi-Sushi-Party-Platter-1200x900.jpg",
  },
  {
    id: 3,
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.",
    price: "$9.99",
    image: "https://i.ibb.co.com/kKtxSzD/Caesar-Salad-TIMG.jpg",
  },
  {
    id: 4,
    name: "Burger Deluxe",
    description:
      "Juicy beef patty with cheese, lettuce, tomato, and a side of fries.",
    price: "$14.99",
    image: "https://i.ibb.co.com/MsCCvtw/3190441498.jpg",
  },
  {
    id: 5,
    name: "Spaghetti Carbonara",
    description: "Creamy pasta with bacon, egg yolk, and parmesan.",
    price: "$13.99",
    image:
      "https://i.ibb.co.com/hCQCHZk/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    description: "Decadent dessert with a gooey chocolate center.",
    price: "$7.99",
    image: "https://i.ibb.co.com/t8cRt0z/lava-cake-1.jpg",
  },
]

export const verifyPassword = (password) => {
  
  const hasLowerCase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const isLongEnough = password.length >= 6;

  if (!hasUppercase) {
    return "Must have an Uppercase letter in the password";
  }
  if (!hasLowerCase) {
    return "Must have a Lowercase letter in the password";
  }
  if (!isLongEnough) {
    return "Length must be at least 6 character";
  }

  return "Password is valid";
};
