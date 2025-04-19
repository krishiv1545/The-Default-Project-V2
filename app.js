// app.js (in the root)
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth"); // Update to correct path

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "super_secret_key", // Change to your actual secret key
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Routes
app.use("/", authRoutes); // Mount routes correctly

module.exports = app; // Exports the app for server.js
