const Request = require('supertest');
const TestHelper = require('../../../server/helpers/TestHelper');
const product = require('../../../server/api/product');
const Database = require('../../../server/services/Database');
const Redis = require('../../../server/services/Redis');

jest.mock('../../../server/services/Redis', () => ({
  getKey: jest.fn(),
  setWithExpire: jest.fn(),
  delKey: jest.fn()
}));

let server;
describe('Product', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/v1/product', product);
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('APi V1 Query Database', () => {
    describe('GET /v1/products', () => {
      it('should return 200 and products list, when get list product', async () => {
        const mockproductList = [
          { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
          { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
          { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
        ];
        Redis.getKey.mockResolvedValue(null);
        Redis.setWithExpire.mockResolvedValue(null);
        jest.spyOn(Database, 'getProducts').mockResolvedValue(mockproductList);
        const response = await Request(server).get('/api/v1/product');
        expect(response.status).toBe(200);
      });

      it('should return 200 and get products from redis', async () => {
        const mockproductList = [
          { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
          { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
          { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
        ];
        Redis.getKey.mockResolvedValue(JSON.stringify(mockproductList));
        const response = await Request(server).get('/api/v1/product');
        expect(response.status).toBe(200);
      });

      it('should return 404 when products not found', async () => {
        jest.spyOn(Database, 'getProducts').mockResolvedValue([]);
        const response = await Request(server).get('/api/v1/product');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        Redis.getKey.mockResolvedValue(null);
        Redis.setWithExpire.mockResolvedValue(null);
        jest.spyOn(Database, 'getProducts').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/v1/product');
        expect(response.status).toBe(500);
      });
    });

    describe('GET /v1/product', () => {
      it('should return 200 and product list, when get list product', async () => {
        const mockproductList = [
          { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
          { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
          { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
        ];
        jest.spyOn(Database, 'getProduct').mockResolvedValue(mockproductList);

        const response = await Request(server).get('/api/v1/product/2');
        expect(response.status).toBe(200);
      });

      it('should return 404 when product not found', async () => {
        jest.spyOn(Database, 'getProduct').mockResolvedValue([]);
        const response = await Request(server).get('/api/v1/product/40');
        expect(response.status).toBe(404);
      });

      it('should return 400 when params not number', async () => {
        const mockproductList = [
          { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
          { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
          { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
        ];
        jest.spyOn(Database, 'getProduct').mockResolvedValue(mockproductList);
        const response = await Request(server).get('/api/v1/product/abc');
        expect(response.status).toBe(400);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'getProduct').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/v1/product/1');
        expect(response.status).toBe(500);
      });
    });

    describe('POST /v1/product', () => {
      it('should return 200 and success message, when add product', async () => {
        const mockproductList = [
          { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
          { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
          { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
        ];
        Redis.getKey.mockResolvedValue(mockproductList);
        Redis.setWithExpire.mockResolvedValue(null);
        Redis.delKey.mockResolvedValue('success');
        jest.spyOn(Database, 'addProduct').mockResolvedValue('success');
        const response = await Request(server)
          .post('/api/v1/product')
          .send({ name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 });
        expect(response.status).toBe(200);
      });

      it('should return 200 and success message from redis', async () => {
        Redis.getKey.mockResolvedValue(null);
        Redis.setWithExpire.mockResolvedValue(null);
        Redis.delKey.mockResolvedValue('OK');
        jest.spyOn(Database, 'addProduct').mockResolvedValue('success');
        const response = await Request(server)
          .post('/api/v1/product')
          .send({ name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 });
        expect(response.status).toBe(200);
      });

      it('should return 400 when request body empty', async () => {
        jest.spyOn(Database, 'addProduct').mockResolvedValue([]);
        const response = await Request(server)
          .post('/api/v1/product')
          .send({ name: '', brand: 'Compass', price: 798000, stock: 10 });
        expect(response.status).toBe(400);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'addProduct').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server)
          .post('/api/v1/product')
          .send({ name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 });
        expect(response.status).toBe(500);
      });
    });

    describe('PUT /v1/:id', () => {
      it('should return 200 and success message, when edit product', async () => {
        const mockproductList = [
          { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
          { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
          { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
        ];
        Redis.getKey.mockResolvedValue(mockproductList);
        Redis.setWithExpire.mockResolvedValue(null);
        Redis.delKey.mockResolvedValue('success');
        jest
          .spyOn(Database, 'editProduct')
          .mockResolvedValue({ id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 });
        const response = await Request(server)
          .put('/api/v1/product/2')
          .send({ name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 });
        expect(response.status).toBe(200);
      });

      it('should return 400 and success message, incorrect body', async () => {
        const response = await Request(server)
          .put('/api/v1/product/1')
          .send({ name: 'Velocity Black Gum', brands: 'Compass', price: 798000, stock: 10 });
        expect(response.status).toBe(400);
      });

      it('should return 404 when product not found', async () => {
        jest.spyOn(Database, 'editProduct').mockResolvedValue(false);
        const response = await Request(server)
          .put('/api/v1/product/10')
          .send({ name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 });
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'editProduct').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server)
          .put('/api/v1/product/2')
          .send({ name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 });
        expect(response.status).toBe(500);
      });
    });

    describe('DELETE /v1/:id', () => {
      it('should return 200 and success message, when delete product', async () => {
        const mockproductList = [
          { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
          { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
          { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
        ];
        Redis.getKey.mockResolvedValue(mockproductList);
        Redis.setWithExpire.mockResolvedValue(null);
        Redis.delKey.mockResolvedValue('success');
        jest
          .spyOn(Database, 'deleteProduct')
          .mockResolvedValue({ id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 });
        const response = await Request(server).delete('/api/v1/product/2');
        expect(response.status).toBe(200);
      });

      it('should return 404 when product not found', async () => {
        jest.spyOn(Database, 'deleteProduct').mockResolvedValue(false);
        const response = await Request(server).delete('/api/v1/product/10');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'deleteProduct').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).delete('/api/v1/product/2');
        expect(response.status).toBe(500);
      });
    });
  });
});
