const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Instituicao = sequelize.define('Instituicao', {
  FC_CNPJ: { type: DataTypes.STRING(19), primaryKey: true },
  FC_RAZAO_SOCIAL: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

module.exports = Instituicao;
