const express = require("express");
const db = require("../config/db");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ✅ Configure image upload with Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// ✅ Add a new dish (Fixes applied)
router.post("/add", upload.single("image"), (req, res) => {
    const { restaurant_id, name, ingredients, price, category } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    db.query(
        "INSERT INTO dishes (restaurant_id, name, ingredients, image, price, category) VALUES (?, ?, ?, ?, ?, ?)",
        [restaurant_id, name, ingredients, imagePath, price, category],
        (err, result) => {
            if (err) {
                console.error("❌ Error adding dish:", err);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: "Dish added successfully",
                dish: {
                    id: result.insertId,
                    name,
                    ingredients,
                    image: imagePath ? `http://localhost:5001${imagePath}` : null,
                    price,
                    category
                }
            });
        }
    );
});


// ✅ Get all dishes (For customers)
router.get("/all", (req, res) => {
    db.query("SELECT * FROM dishes", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ✅ Get dishes by restaurant (Fix applied)
router.get("/byrestaurant/:id", (req, res) => {
    db.query("SELECT * FROM dishes WHERE restaurant_id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        // ✅ Ensure each dish has the correct image path
        results = results.map(dish => ({
            ...dish,
            image: dish.image ? `http://localhost:5001${dish.image}` : null,
        }));

        res.json(results);
    });
});

module.exports = router;
