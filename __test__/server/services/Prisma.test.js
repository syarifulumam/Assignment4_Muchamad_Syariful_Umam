const { PrismaClient } = require('@prisma/client');
const { getProducts, getProduct, addProduct, editProduct, deleteProduct } = require('../../../server/services/Prisma');

// Mock PrismaClient and its methods
jest.mock('@prisma/client', () => {
  const findManyMock = jest.fn();
  const findFirstMock = jest.fn();
  const createMock = jest.fn();
  const updateMock = jest.fn();
  const deleteMock = jest.fn();
  class PrismaClientMock {
    constructor() {
      this.product = {
        findMany: findManyMock,
        findFirst: findFirstMock,
        create: createMock,
        update: updateMock,
        delete: deleteMock
      };
      this.$disconnect = () => {};
    }
  }
  return {
    PrismaClient: PrismaClientMock
  };
});

describe('Prisma-based product CRUD operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return product list', async () => {
      const mockData = [
        { id: 1, name: 'GAZELLE LOW BLACK WHITE', brand: 'Compass', price: 408000, stock: 10 },
        { id: 2, name: 'RETROGRADE LOW BLACK WHITE', brand: 'Compass', price: 538000, stock: 10 },
        { id: 3, name: 'GAZELLE HI WHITE BLUE', brand: 'Compass', price: 438000, stock: 10 }
      ];

      const prismaMock = new PrismaClient();
      prismaMock.product.findMany.mockResolvedValue(mockData);

      const result = await getProducts();

      expect(result).toEqual(mockData);
      expect(prismaMock.product.findMany).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      const prismaMock = new PrismaClient();
      prismaMock.product.findMany.mockRejectedValue(mockError);

      await expect(getProducts()).rejects.toThrow(mockError);
      expect(prismaMock.product.findMany).toHaveBeenCalled();
    });
  });

  describe('getProduct', () => {
    it('should return product list', async () => {
      const mockData = [
        { id: 1, name: 'GAZELLE LOW BLACK WHITE', brand: 'Compass', price: 408000, stock: 10 },
        { id: 2, name: 'RETROGRADE LOW BLACK WHITE', brand: 'Compass', price: 538000, stock: 10 },
        { id: 3, name: 'GAZELLE HI WHITE BLUE', brand: 'Compass', price: 438000, stock: 10 }
      ];

      const prismaMock = new PrismaClient();
      prismaMock.product.findFirst.mockResolvedValue(mockData);

      const result = await getProduct(1);

      expect(result).toEqual(mockData);
      expect(prismaMock.product.findFirst).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      const prismaMock = new PrismaClient();
      prismaMock.product.findFirst.mockRejectedValue(mockError);

      await expect(getProduct(1)).rejects.toThrow(mockError);
      expect(prismaMock.product.findFirst).toHaveBeenCalled();
    });
  });

  describe('addProduct', () => {
    it('should successfully add product entry', async () => {
      const prismaMock = new PrismaClient();
      prismaMock.product.create.mockResolvedValue('success');
      await addProduct('GAZELLE LOW BLACK WHITE', 'Compass', 408000, 10);
      expect(prismaMock.product.create).toHaveBeenCalled();
    });
  });

  describe('editProduct', () => {
    it('should successfully edit product entry', async () => {
      const prismaMock = new PrismaClient();
      prismaMock.product.update.mockResolvedValue({
        id: 1,
        name: 'GAZELLE LOW BLACK WHITE',
        brand: 'Compass',
        price: 408000,
        stock: 10
      });
      await editProduct(1, 'GAZELLE LOW BLACK WHITE', 'Compass', 408000, 10);
      expect(prismaMock.product.update).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = { code: 'P2025' };
      const prismaMock = new PrismaClient();
      prismaMock.product.update.mockRejectedValue(mockError);
      const result = await editProduct(1, 'GAZELLE LOW BLACK WHITE', 'Compass', 408000, 10);
      expect(result).toBe(false);
      expect(prismaMock.product.update).toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('should successfully delete product entry', async () => {
      const prismaMock = new PrismaClient();
      prismaMock.product.delete.mockResolvedValue({
        id: 1,
        name: 'GAZELLE LOW BLACK WHITE',
        brand: 'Compass',
        price: 408000,
        stock: 10
      });
      await deleteProduct(1);
      expect(prismaMock.product.delete).toHaveBeenCalled();
    });
  });
});
