const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    max: 100
  },
  family_name: {
    type: String,
    required: true,
    max: 100
  },
  date_of_birth: {
    type: Date
  },
  date_of_death: {
    type: Date
  }
});

AuthorSchema.virtual("full_name").get(function() {
  if (this.first_name && this.family_name) {
    return this.family_name + " " + this.first_name;
  } else {
    return "";
  }
});

AuthorSchema.virtual("lifespan").get(function() {
  return (
    this.date_of_death.getYear() - this.date_of_birth.getYear()
  ).toString();
});

AuthorSchema.virtual("url").get(function() {
  return "/catalog/author/" + this._id;
});

const Author = model("Author", AuthorSchema);

module.exports = Author;
