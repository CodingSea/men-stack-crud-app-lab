const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
{
  name: { type: String, required: true },
  description: { type: String, required: true },
  countryOfOrigin: String,
  image: String,
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;