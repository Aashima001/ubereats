const express = require("express");
const multer = require("multer");
const db = require("../config/db");
const router = express.Router();

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// ✅ Get Profile Information
router.get("/", authMiddleware, (req, res) => {
  const userId = req.session.user.id;

  db.query("SELECT name, email, country, state, profile_pic FROM users WHERE id = ?", [userId], 
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results[0]);
    }
  );
});

// ✅ Update Profile Information
router.put("/", authMiddleware, (req, res) => {
  const userId = req.session.user.id;
  const { name, country, state } = req.body;

  db.query(
    "UPDATE users SET name = ?, country = ?, state = ? WHERE id = ?",
    [name, country, state, userId],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Profile updated successfully" });
    }
  );
});

// ✅ Upload Profile Picture
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${req.session.user.id}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/upload", authMiddleware, upload.single("profile_pic"), (req, res) => {
  const userId = req.session.user.id;
  const profilePicUrl = `/uploads/${req.file.filename}`;

  db.query("UPDATE users SET profile_pic = ? WHERE id = ?", [profilePicUrl, userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Profile picture updated successfully", profilePicUrl });
  });
});

module.exports = router;
