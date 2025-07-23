const express = require("express");
const app = express();
const Food = require("./models/Food");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));

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


app.get("/food/new", (req, res) => 
{
    res.render("new.ejs");
});

app.post("/food/new", async (req, res) =>
{
    try
    {
        await Food.create(req.body)
    }
    catch(error)
    {
        console.log(error);
    }
    res.redirect("/food");
});

app.get("/food", async (req, res) =>
{
    try
    {
        const food = await Food.find();
        res.render("all-foods.ejs", {food});
    }
    catch(error)
    {
        console.log(error);
    }
});


app.listen("3000", () =>
{
    console.log("Listening on port 3000");
});

/*
try
{

}
catch(error)
{
    console.log(error);
}
*/