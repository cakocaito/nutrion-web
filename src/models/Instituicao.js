const pool = require('./db');

class Instituicao {
  static async create(instituicao) {
    const { FC_RAZAO_SOCIAL, FC_CNPJ } = instituicao;
    const query = `
          INSERT INTO nutrion.instituicao (FC_RAZAO_SOCIAL, FC_CNPJ)
          VALUES ($1, $2)
          RETURNING *;
      `;
    const values = [FC_RAZAO_SOCIAL, FC_CNPJ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = Instituicao;
