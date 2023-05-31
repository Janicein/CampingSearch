
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
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) +10;
        const camp = new Campground({
            author:'6452eadc619be1e1a1d6193c',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)}${sample(places)}`,
            // image:'https://source.unsplash.com/collection/1114848',
            description:'Good place',
            price,
            geometry:{
                type:"Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/diaq8nelo/image/upload/v1684187961/CampingSearch/eljl7ndd4usvoodscxah.jpg',
                    filename: 'CampingSearch/eljl7ndd4usvoodscxah'
                  },
                  {
                    url: 'https://res.cloudinary.com/diaq8nelo/image/upload/v1684187961/CampingSearch/i2tunoefuxxrkn0k340p.jpg',
                    filename: 'CampingSearch/i2tunoefuxxrkn0k340p'
                  }
            ]

        })
        await camp.save();
    }
}

seedDB();