// src/app.js
const express = require("express");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth.routes");
const sessionConfig = require("./config/session");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionConfig));

// Mount routes
app.use("/", authRoutes);

module.exports = app;
