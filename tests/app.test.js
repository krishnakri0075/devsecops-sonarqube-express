const request = require('supertest');
const app = require('../src/app');

describe('DevSecOps Sample API Tests', () => {
  it('GET /api/health should return UP status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('UP');
  });

  it('GET /api/users/search should sanitize input', async () => {
    const res = await request(app).get('/api/users/search?username=admin_user<script>');
    expect(res.statusCode).toEqual(200);
    expect(res.body.query).toEqual('admin_user script');
  });

  it('GET /api/users/search without query should return 400', async () => {
    const res = await request(app).get('/api/users/search');
    expect(res.statusCode).toEqual(400);
  });
});