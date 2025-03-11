require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const multer = require("multer"); // ✅ Added for image upload
const fs = require("fs");
const db = require("./config/db");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ Ensure 'uploads' directory exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// ✅ Serve uploaded images statically
app.use("/uploads", express.static("uploads"));


// ✅ Secure Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ✅ Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save images in "uploads" directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// ✅ Image Upload API (Fix)
app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ imagePath });
});

app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`Route loaded: ${r.route.path}`);
    }
});

// ✅ Import Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/restaurant", require("./routes/restaurant"));
app.use("/api/dish", require("./routes/dish"));
app.use("/api/order", require("./routes/order"));
app.use("/api/profile", require("./routes/profile"));
app.use("/uploads", express.static("uploads"));


// ✅ Ensure database connection before starting the server
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  } else {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
    app.listen(5001, () => console.log("🚀 Server running on port 5001"));
  }
});
