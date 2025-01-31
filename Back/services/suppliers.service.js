const boom = require('boom');
const getConnection = require('../libs/postgres');

class SuppliersService {
  constructor() {
    this.suppliers = [];
  }

  async create(data) {
    const client = await getConnection();
    try {
      const { name, RUC, direccion, estado } = data;
      const existingSupplier = await client.query(
        'SELECT * FROM suppliers WHERE RUC = $1',
        [RUC]
      );
      if (existingSupplier.rows.length > 0) {
        throw boom.conflict('El RUC ya existe');
      }
      const res = await client.query(
        'INSERT INTO suppliers (name, RUC, direccion, estado) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, RUC, direccion, estado]
      );
      return res.rows[0];
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  async find() {
    const client = await getConnection();
    try {
      const res = await client.query('SELECT * FROM suppliers');
      return res.rows;
    } catch (error) {
      throw boom.badRequest('Error al obtener los proveedores');
    }
  }

  async findOne(id) {
    const client = await getConnection();
    try {
      const query = 'SELECT * FROM suppliers WHERE supplier_id = $1';
      const values = [id];
      const res = await client.query(query, values);
      if (res.rows.length === 0) {
        throw boom.notFound('Proveedor no encontrado');
      }
      return res.rows[0];
    } catch (error) {
      throw boom.badRequest('Error al buscar el proveedor');
    }
  }

  async update(id, changes) {
    const client = await getConnection();
    try {
      const existingSupplier = await client.query(
        'SELECT * FROM suppliers WHERE supplier_id = $1',
        [id]
      );
      if (existingSupplier.rows.length === 0) {
        throw boom.notFound('Proveedor no encontrado para actualizar');
      }
      const { name, RUC, direccion, estado } = changes;
      const query = `
        UPDATE suppliers
        SET name = $1, RUC = $2, direccion = $3, estado = $4
        WHERE supplier_id = $5
        RETURNING *`;
      const values = [name, RUC, direccion, estado, id];
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  async delete(id) {
    const client = await getConnection();
    try {
      const query = 'DELETE FROM suppliers WHERE supplier_id = $1';
      const values = [id];
      const res = await client.query(query, values);
      if (res.rowCount === 0) {
        throw boom.notFound('Proveedor no encontrado para eliminar');
      }
      return { id };
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

module.exports = SuppliersService;
