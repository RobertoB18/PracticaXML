const express = require('express');
const router = express.Router();
const db = require('../api/db');

// Get all products
router.get('/', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error fetching products:');
            return res.status(500).json({ error: 'Internal server error'});
        }
        res.json(results);
    });
});
module.exports = router;