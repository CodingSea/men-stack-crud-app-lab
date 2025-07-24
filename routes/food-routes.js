const router = require("express").Router();
const Food = require("../models/Food");



router.get("/new", (req, res) => 
{
    res.render("new.ejs");
});

router.post("/new", async (req, res) =>
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

router.get("", async (req, res) =>
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

router.get("/:id/edit", async (req, res) =>
{
    try
    {
        const food = await Food.findById(req.params.id);
        //console.log(food);
        res.render("food-edit.ejs", {food});
    }
    catch(error)
    {
        console.log(error);
    }
});

router.put("/:id/edit", async (req, res) =>
{
    try
    {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body);
        //console.log(updatedFood);
    }
    catch(error)
    {
        console.log(error);
    }
    res.redirect("/food");
});


router.delete("/:id", async (req, res) =>
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

router

router.get("/:id/view", async (req, res) =>
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

module.exports = router;