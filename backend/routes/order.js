const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Place a new order
router.post('/create', (req, res) => {
    const { customer_id, restaurant_id, status, total_price } = req.body;

    db.query(
        'INSERT INTO orders (customer_id, restaurant_id, status, total_price) VALUES (?, ?, ?, ?)',
        [customer_id, restaurant_id, status, total_price],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Order placed successfully' });
        }
    );
});

// Get all orders for a specific customer
router.get('/customer/:id', (req, res) => {
    const customer_id = req.params.id;

    db.query('SELECT * FROM orders WHERE customer_id = ?', [customer_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;