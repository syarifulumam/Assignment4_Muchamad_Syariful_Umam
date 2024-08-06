const Joi = require('joi');
const Boom = require('boom');

const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const getProductValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().min(2).max(100).required(),
    password: Joi.string().max(191).required(),
    confirmationPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' })
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().min(2).max(100).required(),
    password: Joi.string().max(191).required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = { productValidation, getProductValidation, registerValidation, loginValidation };
