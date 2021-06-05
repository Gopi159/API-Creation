const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
