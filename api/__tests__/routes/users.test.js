const request = require('supertest')

const app = require('../../app')

const { db, client } = require('../../services/database');

jest.mock('../../services/redis', () => ({ publisher: { publish: jest.fn() } }));

afterAll(async () => {
  await client.close();
});

describe('Get Users', () => {

  beforeEach(async () => {

    await db.collection('users').deleteMany({});

  });

  it('should get all users in array', async () => {

    const expected = { 'foo': 'bar' };

    await db.collection('users').insertOne(expected);

    delete expected._id;

    const res = await request(app).get('/users')

    expect(res.statusCode).toEqual(200)

    expect(res.body.length).toEqual(1);

    expect(res.body[0]).toEqual(expect.objectContaining(expected));

  });

});

describe('Post Users', () => {

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
  });

  // users.js regels 22-24: succespad → 201 met insertedId
  it('should create a user and return 201 with insertedId', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  // users.js regel 26: catch-branch → 500 bij database-fout
  it('should return 500 when the database insert fails', async () => {
    jest.spyOn(db, 'collection').mockReturnValueOnce({
      insertOne: jest.fn().mockRejectedValue(new Error('DB failure')),
    });

    const res = await request(app)
      .post('/users')
      .send({ name: 'Bob' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toEqual(500);
  });

});
