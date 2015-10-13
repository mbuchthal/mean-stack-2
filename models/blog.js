// Load required packages
var mongoose = require("mongoose");

// Define our teams schema
var BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
  comments: Number
});

// Export the Mongoose model
module.exports = mongoose.model("Blog", BlogSchema);
