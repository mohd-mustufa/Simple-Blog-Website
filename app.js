const express = require("express");
const morgan = require("morgan");

// Express app
const app = express();

// Register view engine
app.set("view engine", "ejs");

// Listening to port
app.listen(3001, () => {
  console.log("App is listening on port 3001");
});

// middleware
app.use(express.static("public"));
// app.use(morgan("dev"));

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
