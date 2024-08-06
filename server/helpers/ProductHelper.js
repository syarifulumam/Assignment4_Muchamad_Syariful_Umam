const Boom = require('boom');

const CommonHelper = require('./CommonHelper');
const Database = require('../services/Database');
const Redis = require('../services/Redis');

const getProducts = async () => {
  try {
    const dataFromRedis = await Redis.getKey('products');
    if (dataFromRedis) {
      CommonHelper.log(['Product Helper', 'getProducts', 'INFO'], {
        message: 'Get data from redis',
        key: 'products'
      });
      return JSON.parse(dataFromRedis);
    }
    const data = await Database.getProducts();
    await Redis.setWithExpire('products', JSON.stringify(data), 86400);
    if (data.length === 0) {
      return Boom.notFound(`Product list not found `);
    }
    return {
      count: data.length,
      list: data
    };
  } catch (error) {
    CommonHelper.log(['Product Helper', 'getProducts', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getProduct = async (req) => {
  const id = req.params.id;
  try {
    const product = await Database.getProduct(id);
    if (product.length === 0) {
      return Boom.notFound(`Product with id ${id} not found `);
    }
    return product;
  } catch (error) {
    CommonHelper.log(['Product Helper', 'getProduct', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const addProduct = async (req) => {
  const { name, brand, price, stock } = req.body;
  try {
    await Database.addProduct(name, brand, price, stock);
    const dataFromRedis = await Redis.getKey('products');
    if (dataFromRedis) {
      await Redis.delKey('products');
    }
    return `Added '${name}' , '${brand}' , '${price}' , '${stock}' to product`;
  } catch (error) {
    CommonHelper.log(['Product Helper', 'addProduct', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const editProduct = async (req) => {
  const id = req.params.id;
  const { name, brand, price, stock } = req.body;
  try {
    const product = await Database.editProduct(id, name, brand, price, stock);
    if (!product) {
      return Boom.notFound(`Product with id ${id} not found `);
    }
    const dataFromRedis = await Redis.getKey('products');
    if (dataFromRedis) {
      await Redis.delKey('products');
    }
    return `Edited '${name}' , '${brand}' , '${price}' , '${stock}' to product`;
  } catch (error) {
    CommonHelper.log(['Product Helper', 'editProduct', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const deleteProduct = async (req) => {
  try {
    const product = await Database.deleteProduct(req.params.id);
    if (!product) {
      return Boom.notFound(`Product with id ${req.params.id} not found `);
    }
    const dataFromRedis = await Redis.getKey('products');
    if (dataFromRedis) {
      await Redis.delKey('products');
    }
    return `Delete id ${req.params.id} successfully`;
  } catch (error) {
    CommonHelper.log(['PhoneBook Helper', 'deleteProduct', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct
};
