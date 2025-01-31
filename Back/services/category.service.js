const boom = require('boom');
const pool = require('../libs/postgres.pool');

class CategoryService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error(err);
    });
  }


  async create(data) {
    return data;
  }

  async find() {
    const query = 'SELECT * FROM category';
    const rst = await this.pool.query(query);
    return rst.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = CategoryService;
