const request = require('supertest');
const app = require('../app');
const { db, client } = require('../services/database');

afterAll(async () => {
  await client.close();
});

describe('GET /items', () => {
  beforeEach(async () => {
    await db.collection('items').deleteMany({});
  });

  it('returns all items as an array', async () => {
    await db.collection('items').insertOne({ name: 'Widget', quantity: 10 });

    const res = await request(app).get('/items');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0]).toMatchObject({ name: 'Widget', quantity: 10 });
  });
});

describe('POST /items', () => {
  beforeEach(async () => {
    await db.collection('items').deleteMany({});
  });

  it('creates an item and returns 201 with id', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Gadget', quantity: 5 })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('returns 500 when the database insert fails', async () => {
    jest.spyOn(db, 'collection').mockReturnValueOnce({
      insertOne: jest.fn().mockRejectedValue(new Error('DB down')),
    });

    const res = await request(app)
      .post('/items')
      .send({ name: 'Broken' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toEqual(500);
  });
});
