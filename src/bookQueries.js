require("./config/mongodb");

const Book = require("./models/book");

// const nodeBook = new Book({
//   title: "Practical Node.js by Azat Mardan",
//   author: "5deccb332e777e0bd55b2a9a",
//   summary:
//     "Practical Node.js is one of the best sellers on Amazon. Practical Node.js provides step by step guide to build scalable read world web application using Node.js. Practical Node.js is also not for beginners but intermediate level readers.",
//   isbn: "9781987618297"
// });

// nodeBook
//   .save()
//   .then(response => console.log(response))
//   .catch(console.error);

const findQuery = Book.findOne(
  { _id: "5deccf18a96dcb0e597dcc8a" },
  { author: 1, isbn: 1 }
);

findQuery
  .exec()
  .then(response => {
    console.log(response);
  })
  .catch(console.error);
