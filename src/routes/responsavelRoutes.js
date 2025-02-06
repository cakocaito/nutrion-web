const express = require('express');
const path = require('path');
const router = express.Router();
const ResponsavelController = require('../controllers/ResponsavelController');

// Rota para cadastrar um consultor
router.post('/cadastrar_responsavel', ResponsavelController.cadastrarResponsavel);

// Rota para a tela de cadastro de consultor
router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/cadastro/cadastro_responsavel.html'));
});
router.get('/graficos', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/responsavel/graficos.html'));
});

// Rota para a tela de início do consultor
router.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/responsavel/inicio.html'));
});

module.exports = router;    