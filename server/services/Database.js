// eslint-disable-next-line import/no-extraneous-dependencies
const MySQL = require('mysql2/promise');
const CommonHelper = require('../helpers/CommonHelper');

const connectionPool = MySQL.createPool({
  host: process.env.MYSQL_CONFIG_HOST || 'localhost',
  user: process.env.MYSQL_CONFIG_USER || 'root',
  password: process.env.MYSQL_CONFIG_PASSWORD || '',
  database: process.env.MYSQL_CONFIG_DATABASE || 'store',
  port: Number(process.env.MYSQL_PORT) || 3306,
  connectionLimit: Number(process.env.MYSQL_CONN_LIMIT) || 0
});

const productTable = process.env.PHONEBOOK_TABLE || 'products';

const executeQuery = async (query, values = []) => {
  let connection = null;
  try {
    connection = await connectionPool.getConnection();
    const timeStart = process.hrtime();
    const [result] = await connection.query(query, values);
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'Operation', 'INFO'], {
      message: { query, timeTaken }
    });
    if (connection) connection.release();
    return result;
  } catch (error) {
    CommonHelper.log(['Database', 'Operation', 'ERROR'], {
      message: `${error}`
    });
    if (connection) connection.release();
    throw error;
  }
};

const getProducts = async () => {
  const query = `SELECT name, brand, price, stock FROM ${productTable} ORDER BY id ASC`;
  const rawResult = await executeQuery(query);
  return Object.values(JSON.parse(JSON.stringify(rawResult)));
};

const getProduct = async (id) => {
  const query = `SELECT id,name,brand,price,stock FROM ${productTable} WHERE id = ?`;
  const rawResult = await executeQuery(query, [id]);
  return Object.values(JSON.parse(JSON.stringify(rawResult)));
};

const addProduct = async (name, brand, price, stock) => {
  const query = `INSERT INTO ${productTable} (name, brand, price, stock) VALUES (?, ?, ?, ?)`;
  await executeQuery(query, [name, brand, price, stock]);
};

const editProduct = async (id, name, brand, price, stock) => {
  const query = `UPDATE ${productTable} SET name = ?, brand = ?, price = ?, stock = ?, updatedAt = NOW() WHERE id = ?`;
  const result = await executeQuery(query, [name, brand, price, stock, id]);
  return result?.affectedRows > 0;
};

const deleteProduct = async (id) => {
  const query = `DELETE FROM ${productTable} WHERE id = ?`;
  const result = await executeQuery(query, [id]);
  return result?.affectedRows > 0;
};

const getUser = async (email) => {
  const query = `SELECT id, name, email, password FROM users WHERE email = ?`;
  const rawResult = await executeQuery(query, [email]);
  return Object.values(JSON.parse(JSON.stringify(rawResult)));
};

const register = async (name, email, password) => {
  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  const result = await executeQuery(query, [name, email, password]);
  return result?.affectedRows > 0;
};

const updateToken = async (id, refreshToken) => {
  const query = `UPDATE users SET refresh_token = ? WHERE id = ?`;
  const result = await executeQuery(query, [refreshToken, id]);
  return result?.affectedRows > 0;
};

const getUserByRefreshToken = async (refreshToken) => {
  const query = `SELECT id, name, email FROM users WHERE refresh_token = ?`;
  const rawResult = await executeQuery(query, [refreshToken]);
  return Object.values(JSON.parse(JSON.stringify(rawResult)));
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getUser,
  register,
  updateToken,
  getUserByRefreshToken
};
