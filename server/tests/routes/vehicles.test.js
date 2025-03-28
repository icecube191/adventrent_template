const request = require('supertest');
const app = require('../../index');
const db = require('../../config/db');
const jwt = require('jsonwebtoken');

describe('Vehicle Routes', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    // Clear test database
    await db.query('DELETE FROM vehicles');
    await db.query('DELETE FROM users');

    // Create test user
    const result = await db.query(
      'INSERT INTO users (email, password, full_name) VALUES ($1, $2, $3) RETURNING id',
      ['test@example.com', 'hashedpassword', 'Test User']
    );
    userId = result.rows[0].id;
    authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await db.pool.end();
  });

  describe('GET /api/vehicles', () => {
    it('should return paginated vehicles', async () => {
      const res = await request(app)
        .get('/api/vehicles')
        .query({ page: 1, limit: 20 });

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should filter vehicles by type', async () => {
      const res = await request(app)
        .get('/api/vehicles')
        .query({ type: 'ATV' });

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      res.body.forEach(vehicle => {
        expect(vehicle.type).toBe('ATV');
      });
    });
  });

  describe('POST /api/vehicles', () => {
    it('should create a new vehicle listing', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Vehicle',
          type: 'ATV',
          price: 299.99,
          description: 'Test description'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('Test Vehicle');
    });

    it('should not create vehicle without auth', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .send({
          title: 'Test Vehicle',
          type: 'ATV',
          price: 299.99
        });

      expect(res.statusCode).toBe(401);
    });
  });
});