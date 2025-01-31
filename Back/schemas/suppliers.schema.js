const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const RUC = Joi.string().min(10).max(11).pattern(/^\d+$/);  // Asegura que el RUC sea numérico
const direccion = Joi.string().min(10).max(100);
const estado = Joi.string().valid('activo', 'inactivo');

// Esquema para crear un proveedor
const createSupplierSchema = Joi.object({
    name: name.required(),
    RUC: RUC.required(),
    direccion: direccion.required(),
    estado: estado.required(),
});

// Esquema para actualizar un proveedor (campos opcionales)
const updateSupplierSchema = Joi.object({
    name: name,
    RUC: RUC,
    direccion: direccion,
    estado: estado,
});

// Esquema para obtener un proveedor por ID
const getSupplierSchema = Joi.object({
    id: id.required(),
});

module.exports = { createSupplierSchema, updateSupplierSchema, getSupplierSchema };