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

app.get("/food/:id/edit", async (req, res) =>
{
    try
    {
        const food = await Food.findById(req.params.id);
        console.log(food);
        res.render("food-edit.ejs", {food});
    }
    catch(error)
    {
        console.log(error);
    }
});

app.post("/food/:id/edit", async (req, res) =>
{
    try
    {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body);
        console.log(updatedFood);
    }
    catch(error)
    {
        console.log(error);
    }
    res.redirect("/food");
});


app.get("/food/:id/delete", async (req, res) =>
{
    try
    {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        res.redirect("/food")
    }
    catch(error)
    {
        console.log(error);
    }
});

app.get("/food/:id/view", async (req, res) =>
{
    try
    {
        const food = await Food.findById(req.params.id);

        res.render("food-view.ejs", {food});
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