const express = require('express');
const path = require('path');
const router = express.Router();
const ConsultorController = require('../controllers/ConsultorController');

// Rota para cadastrar um consultor
router.post('/cadastrar_consultor', ConsultorController.cadastrarConsultor);

// Rota para a tela de cadastro de consultor
router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/cadastro/cadastro_consultor.html'));
});


// Rota para a tela de início do consultor
router.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/consultor/inicio.html'));
});

module.exports = router;    