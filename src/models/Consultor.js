const pool = require('./db');

class Consultor {
    static async create(consultor) {
        const { FC_CPF, FC_NOME_COMPLETO, FC_EMAIL, FC_SENHA, FD_DATA_NASCIMENTO } = consultor;
        const query = `
            INSERT INTO nutrion.consultor (FC_CPF, FC_NOME_COMPLETO, FC_EMAIL, FC_SENHA, FD_DATA_NASCIMENTO)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [FC_CPF, FC_NOME_COMPLETO, FC_EMAIL, FC_SENHA, FD_DATA_NASCIMENTO];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

module.exports = Consultor;