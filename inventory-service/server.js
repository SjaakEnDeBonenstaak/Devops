const app = require('./app');

require('./subscriber');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`inventory-service listening on port ${PORT}`);
});
