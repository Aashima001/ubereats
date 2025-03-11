require("dotenv").config(); // ✅ Load environment variables

const express = require("express");
const authRouter = express.Router(); // ✅ Fixed: Using authRouter consistently
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const session = require("express-session");

// ✅ Secure Session Middleware (Place it before defining routes)
authRouter.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret", // ✅ Fixed secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Secure only in production
  })
);

// ✅ User Signup Route
authRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (users.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ success: true, message: "User registered successfully" });
      }
    );
  });
});

// ✅ User Login Route
authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (users.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = { id: user.id, name: user.name, email: user.email };
      return res.json({ message: "Login successful", user: req.session.user });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// ✅ Restaurant Signup Route
authRouter.post("/signuprestaurant", async (req, res) => {
  const { name, email, password, location } = req.body;

  db.query("SELECT * FROM restaurants WHERE email = ?", [email], async (err, restaurants) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (restaurants.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO restaurants (name, email, password, location) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, location],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ success: true, message: "Restaurant registered successfully" });
      }
    );
  });
});

// ✅ Restaurant Login Route
authRouter.post("/loginrestaurant", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM restaurants WHERE email = ?", [email], async (err, restaurants) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }

    if (!restaurants || restaurants.length === 0) {
      return res.status(401).json({ message: "Restaurant not found" });
    }

    const restaurant = restaurants[0];
    const isMatch = await bcrypt.compare(password, restaurant.password);

    if (isMatch) {
      req.session.restaurant = { id: restaurant.id, name: restaurant.name, email: restaurant.email };
      return res.json({ message: "Login successful", restaurant: req.session.restaurant });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// ✅ Logout Route
authRouter.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

// ✅ Get Logged-in User
authRouter.get("/me", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else if (req.session.restaurant) {
    res.json({ restaurant: req.session.restaurant });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// ✅ Ensure proper export
module.exports = authRouter;
