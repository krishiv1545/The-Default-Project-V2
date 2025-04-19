// src/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma"); // Make sure this is correctly pointing to your Prisma model

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "signup.html"));
});

// Serve the login page (GET)
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "login.html"));
});

// POST signup route
router.post("/signup", async (req, res) => {
  const { username, password, enrollmentNumber } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        enrollmentNumber,
      },
    });

    res.status(201).send(`User created: ${user.username}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error.");
  }
});

// POST login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(400).send("Invalid username or password.");

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).send("Invalid username or password.");

    req.session.userId = user.id; // Store userId in session
    res.status(200).send(`Logged in as ${user.username}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error.");
  }
});

// Example of a protected route
router.get("/me", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send("Not logged in.");
  }
  res.send(`Logged in as user ID: ${req.session.userId}`);
});

module.exports = router;
