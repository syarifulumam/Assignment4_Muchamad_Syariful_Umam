const { PrismaClient } = require('@prisma/client');

const CommonHelper = require('../helpers/CommonHelper');

const prisma = new PrismaClient();

const executePrismaOperation = async (operationName, operationFunction) => {
  try {
    const timeStart = process.hrtime();
    const data = await operationFunction();
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Prisma', operationName, 'INFO'], {
      message: { timeTaken },
      data
    });
    prisma.$disconnect();
    return data;
  } catch (error) {
    prisma.$disconnect();
    if (error?.code === 'P2025') {
      // Handle the case where the record is not found
      CommonHelper.log(['Prisma', operationName, 'WARN'], {
        message: `No product entry found`
      });
      return false;
    }
    // Log other errors
    CommonHelper.log(['Prisma', operationName, 'ERROR'], {
      message: `${error}`
    });
    throw error;
  }
};

const getProducts = async () =>
  executePrismaOperation('getProducts', () =>
    prisma.product.findMany({
      select: {
        name: true,
        brand: true,
        price: true,
        stock: true
      }
    })
  );
const getProduct = async (id) =>
  executePrismaOperation('getProduct', async () => {
    const result = await prisma.product.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        name: true,
        brand: true,
        price: true,
        stock: true
      }
    });
    return result;
  });

const addProduct = async (name, brand, price, stock) => {
  await executePrismaOperation('addProduct', async () => {
    await prisma.product.create({
      data: {
        name,
        brand,
        price,
        stock
      }
    });
  });
};

const editProduct = async (id, name, brand, price, stock) =>
  executePrismaOperation('editProduct', async () => {
    const result = await prisma.product.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        brand,
        price,
        stock
      }
    });
    return !!result;
  });

const deleteProduct = async (id) =>
  executePrismaOperation('deleteProduct', async () => {
    const result = await prisma.product.delete({
      where: {
        id: Number(id)
      }
    });
    return !!result;
  });

module.exports = { getProducts, getProduct, addProduct, editProduct, deleteProduct };
