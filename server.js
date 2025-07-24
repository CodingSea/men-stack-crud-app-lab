const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Food = require("./models/Food");
const foodRoutes = require("./routes/food-routes")

const morgan = require("morgan");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use(morgan("dev"));

let seedFile;

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

app.use("/food", foodRoutes);

app.listen("3000", () =>
{
    console.log("Listening on port 3000");
});


module.exports = seedFile;