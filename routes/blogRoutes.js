const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/create", (req, res) => {
  res.render("createBlog", { title: "Create A New Blog" });
});

// DB Related Routes
router.get("/", (req, res) => {
  Blog.find()
    .sort({ updatedAt: -1 })
    .then((result) =>
      res.render("index", { title: "All Blogs", blogs: result })
    )
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("blogDetails", { title: "Blog Details", blog: result });
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
