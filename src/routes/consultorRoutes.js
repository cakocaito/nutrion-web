const express = require('express');
const ConsultorController = require('../controllers/ConsultorController');

const router = express.Router();

// Rota para cadastrar um consultor
router.post('/cadastrar', ConsultorController.cadastrarConsultor);

module.exports = router;