const request = require('supertest');
const app = require('../app');

// app.js regel 27: 404-middleware
describe('404 handler', () => {
  it('returns 404 for an unknown route', async () => {
    const res = await request(app).get('/does-not-exist');
    expect(res.statusCode).toEqual(404);
  });
});

// app.js regels 33-38: error handler
// De handler wordt rechtstreeks aangeroepen zodat alle branches gedekt zijn.
describe('Error handler', () => {
  let errorHandler;

  beforeAll(() => {
    // Express herkent een error handler aan zijn 4 parameters (length === 4)
    const layer = app._router.stack.find((l) => l.handle.length === 4);
    errorHandler = layer && layer.handle;
  });

  const makeRes = () => ({
    locals: {},
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
  });

  // regels 33, 34 (development-branch), 37 (err.status gebruikt), 38
  it('stelt locals in en rendert de error-pagina in development-modus', () => {
    const err = Object.assign(new Error('Iets ging fout'), { status: 422 });
    const req = { app: { get: () => 'development' } };
    const res = makeRes();

    errorHandler(err, req, res, jest.fn());

    expect(res.locals.message).toBe('Iets ging fout');
    expect(res.locals.error).toBe(err);          // volledig error-object in development
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.render).toHaveBeenCalledWith('error');
  });

  // regel 34: production-branch → lege error object
  it('verbergt error-details buiten development-modus', () => {
    const err = Object.assign(new Error('Geheim'), { status: 500 });
    const req = { app: { get: () => 'production' } };
    const res = makeRes();

    errorHandler(err, req, res, jest.fn());

    expect(res.locals.error).toEqual({});        // geen details in productie
  });

  // regel 37: || 500 branch → wanneer err.status ontbreekt
  it('valt terug op status 500 als err.status niet is ingesteld', () => {
    const err = new Error('Geen status');        // geen .status property
    const req = { app: { get: () => 'development' } };
    const res = makeRes();

    errorHandler(err, req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
