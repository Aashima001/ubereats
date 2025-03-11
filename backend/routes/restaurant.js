const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

const restaurantRouter = express.Router();

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

// ✅ Register restaurant API (Now supports image upload)
restaurantRouter.post("/create", upload.single("image"), async (req, res) => {
    const { owner_id, name, email, password, description, location, contact_info, timings } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // ✅ Store uploaded image path

    if (!db || !db.query) {
        return res.status(500).json({ error: "Database connection not initialized yet" });
    }

    try {
        db.query("SELECT * FROM restaurants WHERE email = ?", [email], async (err, results) => {
            if (err) return res.status(500).json({ error: "Database Error", details: err.message });

            if (results.length > 0) return res.status(400).json({ message: "Email already in use" });

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                `INSERT INTO restaurants (owner_id, name, email, password, description, location, contact_info, images, timings) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [owner_id, name, email, hashedPassword, description, location, contact_info, imagePath, timings],
                (err, result) => {
                    if (err) return res.status(500).json({ error: "Database Insert Failed", details: err.message });

                    res.status(201).json({ success: true, message: "Restaurant registered successfully", imagePath });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error: "Unexpected error occurred", details: error.message });
    }
});

// ✅ Restaurant Login API
restaurantRouter.post("/create", upload.single("image"), async (req, res) => {
    const { owner_id, name, email, password, description, location, contact_info, timings } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!db || !db.query) {
        return res.status(500).json({ error: "Database connection not initialized yet" });
    }

    try {
        db.query("SELECT * FROM restaurants WHERE email = ?", [email], async (err, results) => {
            if (err) return res.status(500).json({ error: "Database Error", details: err.message });

            if (results.length > 0) return res.status(400).json({ message: "Email already in use" });

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                `INSERT INTO restaurants (owner_id, name, email, password, description, location, contact_info, images, timings) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [owner_id, name, email, hashedPassword, description, location, contact_info, imagePath, timings],
                (err, result) => {
                    if (err) return res.status(500).json({ error: "Database Insert Failed", details: err.message });

                    res.status(201).json({ 
                        success: true, 
                        message: "Restaurant registered successfully", 
                        restaurant: { id: result.insertId, name, email, imagePath } // ✅ Return stored image path
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error: "Unexpected error occurred", details: error.message });
    }
});

restaurantRouter.get("/byrestaurant/:id", (req, res) => {
    db.query("SELECT * FROM dishes WHERE restaurant_id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        // ✅ Hardcode image paths for specific restaurant IDs
        results = results.map(dish => {
            let hardcodedImage = "/uploads/default.jpg"; // Default fallback image
            if (req.params.id == 26) {
                hardcodedImage = "/uploads/test_image3.jpeg";
            } else if (req.params.id == 27) {
                hardcodedImage = dish.id % 2 === 0 ? "/uploads/test_image1.jpeg" : "/uploads/test_image2.jpeg"; // Alternate images for dishes
            }

            return {
                ...dish,
                image: `http://localhost:5001${hardcodedImage}`,
            };
        });

        res.json(results);
    });
});


// ✅ Fetch All Restaurants with Their Dishes
restaurantRouter.get("/", (req, res) => {
    const query = `
        SELECT r.id AS restaurant_id, r.name AS restaurant_name, r.description, r.location, r.images AS restaurant_image, 
               d.id AS dish_id, d.name AS dish_name, d.image AS dish_image, d.price, d.category
        FROM restaurants r
        LEFT JOIN dishes d ON r.id = d.restaurant_id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error fetching restaurants and dishes:", err);
            return res.status(500).json({ error: err.message });
        }

        // ✅ Group dishes under each restaurant
        const restaurants = {};
        results.forEach(row => {
            if (!restaurants[row.restaurant_id]) {
                restaurants[row.restaurant_id] = {
                    id: row.restaurant_id,
                    name: row.restaurant_name,
                    description: row.description,
                    location: row.location,
                    image: row.restaurant_image ? `http://localhost:5001${row.restaurant_image}` : "/images/default.jpg",
                    dishes: []
                };
            }
            if (row.dish_id) {  // ✅ Only add dish if it exists
                restaurants[row.restaurant_id].dishes.push({
                    id: row.dish_id,
                    name: row.dish_name,
                    image: row.dish_image ? `http://localhost:5001${row.dish_image}` : "/images/default.jpg",
                    price: row.price,
                    category: row.category
                });
            }
        });

        res.json(Object.values(restaurants));
    });
});

// ✅ Keeping your original export
module.exports = restaurantRouter;
