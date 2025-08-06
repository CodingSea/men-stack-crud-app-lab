const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Food = require("./models/Food");
const foodRoutes = require("./routes/food-routes");
const connectToDB = require("./config/db");

const morgan = require("morgan");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use(morgan("dev"));

connectToDB();

app.use("/food", foodRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () =>
{
    console.log("Listening on port " + port);
});

app.use((req,res) => 
{
    res.status(404).render("404.ejs");
});