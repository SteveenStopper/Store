const Joi = require('joi');

const id = Joi.number().integer();
const username = Joi.string().min(3).max(50);
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().valid('user', 'admin');
const created_at = Joi.date().default(() => new Date());

const createUserSchema = Joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
  created_at: created_at,
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
