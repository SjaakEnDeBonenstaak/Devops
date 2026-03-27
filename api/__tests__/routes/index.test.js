const request = require('supertest');
const app = require('../../app');

// index.js regel 6: res.render('index', { title: 'Express' })
describe('GET /', () => {
  it('rendert de indexpagina met de Express-titel', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Express');
  });
});
