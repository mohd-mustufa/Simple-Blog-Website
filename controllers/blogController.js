const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ updatedAt: -1 })
    .then((result) =>
      res.render("index", { title: "All Blogs", blogs: result })
    )
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("blogDetails", { title: "Blog Details", blog: result });
    })
    .catch(() => res.render("error", { title: "404 Error" }));
};

const blog_create_get = (req, res) => {
  res.render("createBlog", { title: "Create A New Blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
