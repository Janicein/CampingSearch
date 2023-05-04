
const Campground = require('../models/campground');
const cities = require('./cities')

const { places, descriptors } = require('./seedHelpers')


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp'
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: 'purple field' });
    // await c.save();

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) +10;
        const camp = new Campground({
            author:'6452eadc619be1e1a1d6193c',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)}${sample(places)}`,
            image:'https://source.unsplash.com/collection/1114848',
            description:'Good place',
            price

        })
        await camp.save();
    }
}

seedDB();