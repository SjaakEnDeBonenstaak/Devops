const { subscriber } = require('./services/redis');
const { db } = require('./services/database');

subscriber.subscribe('user.created', (err) => {
  if (err) console.error('Redis subscribe error:', err);
  else console.log('Listening on channel: user.created');
});

subscriber.on('message', async (_channel, message) => {
  const user = JSON.parse(message);
  await db.collection('inventory').insertOne({ userId: user.id, items: [] });
  console.log('Inventory record aangemaakt voor user:', user.id);
});
