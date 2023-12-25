const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("createBlog", { title: "Create A New Blog" });
});

// DB Related Routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ updatedAt: -1 })
    .then((result) =>
      res.render("index", { title: "All Blogs", blogs: result })
    )
    .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("blogDetails", { title: "Blog Details", blog: result });
    })
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

app.use((req, res) => {
  res.status(404).render("error", { title: "404 Error" });
});
