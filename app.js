const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { ObjectId } = require("mongodb");

// Express app
const app = express();

// Connect to mongoDB & Listen to port
dbURI = "mongodb+srv://admin:admin@simpleblog.gcv6iky.mongodb.net/my-blog";
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(3001, () => console.log("App is listening on port 3001"));
  })
  .catch((err) => console.log(err));

// Register view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));
// app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "demo blog",
    snippet: "some snippet",
    body: "lots of stuff here",
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/single-blog/:id", (req, res) => {
  //   Blog.find({ _id: new ObjectId(req.params.id) })
  Blog.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// Routes
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "First Blog",
      snippet:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae",
    },
    {
      title: "Second Blog",
      snippet:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae",
    },
    {
      title: "Third Blog",
      snippet:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae",
    },
  ];

  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("createBlog", { title: "Create a new blog" });
});

app.use((req, res) => {
  res.status(404).render("error", { title: "404 Error" });
});
