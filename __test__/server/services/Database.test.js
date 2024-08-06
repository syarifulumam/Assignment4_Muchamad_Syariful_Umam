const MySQL = require('mysql2/promise');
const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getUser,
  register,
  updateToken,
  getUserByRefreshToken
} = require('../../../server/services/Database');

jest.mock('mysql2/promise', () => {
  const queryMock = jest.fn();
  const releaseMock = jest.fn();
  return {
    createPool: () => ({
      getConnection: () => ({
        query: queryMock,
        release: releaseMock
      })
    })
  };
});

describe('Product CRUD operations', () => {
  let queryMock;
  let releaseMock;

  beforeEach(() => {
    queryMock = MySQL.createPool().getConnection().query;
    releaseMock = MySQL.createPool().getConnection().release;
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return product list', async () => {
      const mockQuery = [
        { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
        { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
        { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
      ];
      queryMock.mockResolvedValue([mockQuery]);
      const result = await getProducts();
      expect(result).toEqual(mockQuery);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(getProducts()).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('getProduct', () => {
    it('should return product list', async () => {
      const mockQuery = [
        { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
        { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
        { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
      ];
      queryMock.mockResolvedValue([mockQuery]);
      const result = await getProduct(2);
      expect(result).toEqual(mockQuery);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(getProduct(2)).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('addProduct', () => {
    it('should successfully add product entry', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 11,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      await addProduct('GAZELLE LOW BLACK WHITE', 'Compass', 408000, 10);
      expect(queryMock).toHaveBeenCalled();
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(addProduct('GAZELLE LOW BLACK WHITE', 'Compass', 408000, 10)).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('editProduct', () => {
    it('should return true when editing product entry', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 11,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      const result = await editProduct(1, 'GAZELLE LOW BLACK WHITE', 'Compass', 408000, 10);
      expect(result).toBe(true);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(editProduct(1, 'GAZELLE LOW BLACK WHITE', 'Compass', 408000, 10)).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('should return true when deleting product entry', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 11,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      const result = await deleteProduct(1);
      expect(result).toBe(true);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(deleteProduct(1)).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return users', async () => {
      const mockQuery = [
        { id: 1, name: 'admin', email: 'admin@gmail.com', password: 'password' },
        { id: 2, name: 'user', email: 'user@gmail.com', password: 'password' }
      ];
      queryMock.mockResolvedValue([mockQuery]);
      const result = await getUser('admin@gmail.com');
      expect(result).toEqual(mockQuery);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(getUser('admin@gmail.com')).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should successfully add user', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 1,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      await register('admin', 'admin@gmail.com', 'password');
      expect(queryMock).toHaveBeenCalled();
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(register('admin', 'admin@gmail.com', 'password')).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('updateToken', () => {
    it('should return true when editing refresh token', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 1,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      const result = await updateToken(1, 'refreshToken');
      expect(result).toBe(true);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(updateToken(1, 'refreshToken')).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('getUserByRefreshToken', () => {
    it('should return users by refresh token', async () => {
      const mockQuery = [
        { id: 1, name: 'admin', email: 'admin@gmail.com' },
        { id: 2, name: 'user', email: 'user@gmail.com' }
      ];
      queryMock.mockResolvedValue([mockQuery]);
      const result = await getUserByRefreshToken('refreshToken');
      expect(result).toEqual(mockQuery);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(getUserByRefreshToken('refreshToken')).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });
});
