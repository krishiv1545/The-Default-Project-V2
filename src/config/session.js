// src/config/session.js
module.exports = {
  secret: process.env.SESSION_SECRET || "keyboard-cat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};
