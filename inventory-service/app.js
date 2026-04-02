require('dotenv').config();
const express = require('express');
const itemsRouter = require('./routes/items');

const app = express();

app.use(express.json());
app.use('/items', itemsRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, _next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
