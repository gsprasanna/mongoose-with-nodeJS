const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  }
});

BookSchema.virtual("url").get(function() {
  return "/catalog/Book/" + this._id;
});

const Book = model("Book", BookSchema);

module.exports = Book;
