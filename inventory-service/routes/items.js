const express = require('express');
const { db } = require('../services/database');

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await db.collection('items').find().toArray();
  res.json(items);
});

router.post('/', (req, res) => {
  db.collection('items').insertOne(req.body)
    .then((result) => res.status(201).json({ id: result.insertedId }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
