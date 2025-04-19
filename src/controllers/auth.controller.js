// src/controllers/auth.controller.js
const db = require("../config/db");
const prisma = require("../config/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT id FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) return res.status(500).send("Internal error");
      if (!row) return res.status(401).send("Invalid credentials");

      req.session.userId = row.id;
      res.redirect("/dashboard");
    }
  );
};

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: { username, password },
    });
    req.session.userId = user.id;
    res.send("Signed up!");
  } catch (err) {
    if (err.code === "P2002") {
      res.send("Username already exists.");
    } else {
      res.send("Signup error.");
    }
  }
};
