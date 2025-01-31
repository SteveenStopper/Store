const boom = require('boom');
const getConnection = require('../libs/postgres');

class UserService {
  constructor() {}

  async create(data) {
    const client = await getConnection();
    try {
      const client = await getConnection();
      const { username, email, password } = data;
      const res = await client.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password]
      );
      return res.rows[0];
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  async find() {
    const client = await getConnection();
    try {
      const res = await client.query('SELECT * FROM users');
      return res.rows;
    } catch (error) {
      throw boom.badRequest('Error al obtener los usuarios');
    }
  }

  async findOne(id) {
    const client = await getConnection();
    try {
      const query = 'SELECT * FROM users WHERE user_id = $1';
      const values = [id];
      const res = await client.query(query, values);
      if (res.rows.length === 0) {
        throw boom.notFound('Usuario no encontrado');
      }
      return res.rows[0];
    } catch (error) {
      throw boom.badRequest('Error al buscar el usuario');
    }
  }

  async update(id, changes) {
    const client = await getConnection();
    try {
      const query = `
        UPDATE users
        SET username = $1, email = $2, password = $3
        WHERE user_id = $4
        RETURNING *`;
      const values = [changes.username, changes.email, changes.password, id];
      const res = await client.query(query, values);
      if (res.rows.length === 0) {
        throw boom.notFound('Usuario no encontrado para actualizar');
      }
      return res.rows[0];
    } catch (error) {
      throw boom.badRequest('Error al actualizar el usuario');
    }
  }

  async delete(id) {
    const client = await getConnection();
    try {
      const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
      const values = [id];
      const res = await client.query(query, values);
      if (res.rows.length === 0) {
        throw boom.notFound('Usuario no encontrado para eliminar');
      }
      return res.rows[0];
    } catch (error) {
      throw boom.badRequest('Error al eliminar el usuario');
    }
  }
}

module.exports = UserService;
