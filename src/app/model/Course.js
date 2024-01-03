const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const Course = new Schema({
  name: { type: String, default: "" },
  description: { type: String },
  img: { type: String },
  videoID: { type: String },
  level: { type: String },
  slug: { type: String, slug: "name", unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", Course);
