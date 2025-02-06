const express = require('express');
const path = require('path');
const router = express.Router();
const InstituicaoController = require('../controllers/InstituicaoController');

// Rota para cadastrar um consultor
router.post('/cadastrar_instituicao', InstituicaoController.cadastrarInstituicao);

module.exports = router;    