const mongoose = require("mongoose")
const Food = require("./models/Food")
const dotenv = require("dotenv").config();

const seedData = 
[
    
    {
        "name": "Pizza 1000",
        "description": "Italian Pizza 1000",
        "countryOfOrigin": "Italy",
        "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSrE8NZrHuk8JsciDHRPd23VgwtdjLpvvu9r5QHZyd0dJmGdY9Cc3SeKLj8cD4gbmqQWyNknryfvUgarFvMvw22PQdbcwgRNrhJWwimuzw0Qg"
    },
    {
        "name": "Ramen",
        "description": "sssss",
        "countryOfOrigin": "Japan",
        "image": "data:image/webp;base64,UklGRiYSAABXRUJQVlA4IBoSAADwagCdASrGAOEAPy2Et1QuqKUsrtbLQdAliUESBMp5cGTdPeqywVx4PbV2+"
    }

]


async function connectToDB()
{
    try
    {
        await mongoose.connect(process.env.DBString_URI);
        console.log("Connected to Database");
    }
    catch(error)
    {
        console.log(error);
    }
}

connectToDB();


async function seed()
{
    await Food.insertMany(seedData);
}

//seed();