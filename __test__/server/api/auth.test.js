const Request = require('supertest');
const bcrypt = require('bcrypt');
const TestHelper = require('../../../server/helpers/TestHelper');
const auth = require('../../../server/api/auth');
const Database = require('../../../server/services/Database');

let server;
describe('Auth', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/v1', auth);
    process.env.ACCESS_TOKEN = 'access_token_secret';
    process.env.REFRESH_TOKEN = 'refresh_token_secret';
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /v1/register', () => {
    it('should return 200 and success message when registration is successful', async () => {
      jest.spyOn(Database, 'getUser').mockResolvedValue([]);
      jest.spyOn(Database, 'register').mockResolvedValue();
      const response = await Request(server)
        .post('/api/v1/register')
        .send({ name: 'admin', email: 'admin@gmail.com', password: 'password', confirmationPassword: 'password' });
      expect(response.status).toBe(200);
    });

    it('should return 400 when request body is empty', async () => {
      const response = await Request(server).post('/api/v1/register').send({});
      expect(response.status).toBe(400);
    });

    it('should return 400 when email already exists', async () => {
      jest.spyOn(Database, 'getUser').mockResolvedValue([{ id: 1, email: 'admin@gmail.com' }]);
      const response = await Request(server)
        .post('/api/v1/register')
        .send({ name: 'admin', email: 'admin@gmail.com', password: 'password', confirmationPassword: 'password' });
      expect(response.status).toBe(409); // 409 Conflict
    });

    it('should return 400 when validation fails', async () => {
      const response = await Request(server)
        .post('/api/v1/register')
        .send({ name: 'admin', email: 'not-an-email', password: 'password', confirmationPassword: 'password' });
      expect(response.status).toBe(400);
    });

    it('should return 500 when an internal server error occurs', async () => {
      jest.spyOn(Database, 'getUser').mockResolvedValue([]);
      jest.spyOn(Database, 'register').mockRejectedValue(new Error('Mock error'));
      const response = await Request(server)
        .post('/api/v1/register')
        .send({ name: 'admin', email: 'admin@gmail.com', password: 'password', confirmationPassword: 'password' });
      expect(response.status).toBe(500);
    });
  });

  describe('POST /v1/login', () => {
    it('should return 200 and access token when login is successful', async () => {
      const mockUser = [
        {
          id: 1,
          name: 'admin',
          email: 'admin@gmail.com',
          password: await bcrypt.hash('password', 10)
        }
      ];
      jest.spyOn(Database, 'getUser').mockResolvedValue(mockUser);
      jest.spyOn(Database, 'updateToken').mockResolvedValue('success');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const response = await Request(server)
        .post('/api/v1/login')
        .send({ email: 'admin@gmail.com', password: 'password' });

      expect(response.status).toBe(200);
    });

    it('should return 400 when request body is empty', async () => {
      const response = await Request(server).post('/api/v1/login').send({});
      expect(response.status).toBe(400);
    });

    it('should return 404 when email does not exist', async () => {
      jest.spyOn(Database, 'getUser').mockResolvedValue([]);
      const response = await Request(server)
        .post('/api/v1/login')
        .send({ email: 'admin@gmail.com', password: 'password' });
      expect(response.status).toBe(404); // 404 Not Found
    });

    it('should return 401 when password is incorrect', async () => {
      const mockUser = [
        {
          id: 1,
          name: 'admin',
          email: 'admin@gmail.com',
          password: await bcrypt.hash('password', 10)
        }
      ];
      jest.spyOn(Database, 'getUser').mockResolvedValue(mockUser);

      const response = await Request(server)
        .post('/api/v1/login')
        .send({ email: 'admin@gmail.com', password: 'wrongpassword' });

      expect(response.status).toBe(401); // 401 Unauthorized
    });

    it('should return 500 when an internal server error occurs', async () => {
      jest.spyOn(Database, 'getUser').mockRejectedValue(new Error('Mock error'));
      const response = await Request(server)
        .post('/api/v1/login')
        .send({ email: 'admin@gmail.com', password: 'password' });
      expect(response.status).toBe(500);
    });
  });
});
