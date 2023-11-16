const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const urls = require("./urls");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then(() => {
    console.log("Mongoose connected to Mongodb!");
  })
  .catch((error) => {
    console.log("ON NO, ERROR!");
    console.log(error);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const prices = `${Math.floor(Math.random() * 80 + 20)}.${Math.floor(
      Math.random() * 99 + 1
    )}`;
    const urlRandom100 = Math.floor(Math.random() * 100);

    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)}, ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt nobis eaque perferendis voluptates iure fugiat ratione ab ex, ipsum distinctio quis unde aut facilis repellendus voluptatum, ullam, illum magnam nulla. Reiciendis, nesciunt temporibus qui hic laudantium eligendi aut nam nisi corporis delectus aliquam assumenda vero, nemo sapiente aspernatur dolorem? Hic aliquid quis minima? Dolorem qui eligendi harum amet suscipit maxime. Id assumenda inventore facilis! Architecto dolorem deserunt, quae nulla consequatur et vitae necessitatibus perspiciatis voluptatem ullam vel quasi veniam repellendus unde dolore excepturi, deleniti culpa inventore cum in minus. Quisquam? Corporis perferendis, voluptate eaque doloremque repudiandae inventore harum quos sapiente quam consequuntur ullam nesciunt cumque sed unde ipsum, minus aliquid! Provident ipsum unde accusantium culpa, assumenda fugiat fuga incidunt placeat? Eos possimus dolores tempora veniam deleniti ipsum, officiis atque iure porro quibusdam vel commodi totam odit nesciunt ut corporis culpa sunt molestiae, ab saepe. Praesentium tenetur inventore dolore harum modi? Consequuntur nihil delectus cum ducimus aspernatur, exercitationem veniam temporibus fugiat, dolores quasi, asperiores aut voluptate tenetur. Cumque ab ducimus, quod voluptate soluta quos odit deserunt debitis nulla expedita dicta voluptates.",
      price: prices,
      author: "63b229a891fa1afbe06cec2a",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dnamf41qb/image/upload/v1673737558/YelpCamp/gqnds0p5yhyrrjdqy9kc.jpg",
          filename: "YelpCamp/gqnds0p5yhyrrjdqy9kc",
        },
        {
          url: "https://res.cloudinary.com/dnamf41qb/image/upload/v1673737558/YelpCamp/zb8utiggkrzwm8dpfehr.jpg",
          filename: "YelpCamp/zb8utiggkrzwm8dpfehr",
        },
        {
          url: "https://res.cloudinary.com/dnamf41qb/image/upload/v1673737559/YelpCamp/jncpkkbbwilug8ubq6bj.jpg",
          filename: "YelpCamp/jncpkkbbwilug8ubq6bj",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
