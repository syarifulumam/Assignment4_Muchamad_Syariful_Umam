const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ProductHelper = require('../helpers/ProductHelper');
const ValidationHelper = require('../helpers/ValidationHelper');

const getProducts = async (req, res) => {
  try {
    const data = await ProductHelper.getProducts();
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Product', 'Get List Products', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const getProduct = async (req, res) => {
  try {
    ValidationHelper.getProductValidation(req.params);
    const data = await ProductHelper.getProduct(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Product', 'Get Product', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const addProduct = async (req, res) => {
  try {
    ValidationHelper.productValidation(req.body);
    const data = await ProductHelper.addProduct(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Product', 'Add Product', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const editProduct = async (req, res) => {
  try {
    ValidationHelper.getProductValidation(req.params);
    ValidationHelper.productValidation(req.body);
    const data = await ProductHelper.editProduct(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Product', 'Edit Product', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const deleteProduct = async (req, res) => {
  try {
    ValidationHelper.getProductValidation(req.params);
    const data = await ProductHelper.deleteProduct(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Product', 'Delete Product', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

router.get('/', CommonHelper.preHandler, getProducts);
router.get('/:id', CommonHelper.preHandler, getProduct);
router.post('/', CommonHelper.preHandler, addProduct);
router.put('/:id', CommonHelper.preHandler, editProduct);
router.delete('/:id', CommonHelper.preHandler, deleteProduct);

module.exports = router;
