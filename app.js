const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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

// blog routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("error", { title: "404 Error" });
});
