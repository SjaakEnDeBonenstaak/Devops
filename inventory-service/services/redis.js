const Redis = require('ioredis');

const subscriber = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  lazyConnect: true,
});

module.exports = { subscriber };
