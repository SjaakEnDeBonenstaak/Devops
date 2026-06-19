require('dotenv').config();
const express = require('express');
const promBundle = require('express-prom-bundle');
const itemsRouter = require('./routes/items');

const app = express();

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  metricsPath: '/metrics',
  promClient: { collectDefaultMetrics: {} },
});

app.use(metricsMiddleware);
app.use(express.json());
app.use('/items', itemsRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, _next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
