var express = require('express');

var router = express.Router();

const { db } = require('../services/database');
const { publisher } = require('../services/redis');

router.get('/', async function(req, res) {
  let users = await db.collection('users').find().toArray();
  res.json(users);
});

router.post('/', function(req, res) {
  db.collection('users').insertOne(req.body)
    .then((user) => {
      publisher.publish('user.created', JSON.stringify({ id: user.insertedId, ...req.body }));
      res.status(201).json({ id: user.insertedId });
    })
    .catch(err => res.status(500).json(err));
});


module.exports = router;