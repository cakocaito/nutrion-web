const pool = require('./db');

class Responsavel {
    static async create(responsavel) {
        const { FC_CPF, FC_NOME_COMPLETO, FC_EMAIL, FC_SENHA, FD_DATA_NASCIMENTO, FC_CNPJ } = responsavel;
        const query = `
            INSERT INTO nutrion.responsavel (FC_CPF, FC_NOME_COMPLETO, FC_EMAIL, FC_SENHA, FD_DATA_NASCIMENTO, FC_CNPJ)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [FC_CPF, FC_NOME_COMPLETO, FC_EMAIL, FC_SENHA, FD_DATA_NASCIMENTO, FC_CNPJ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

module.exports = Responsavel;