const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para a tela de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login/login.html'));
});  

// Rota para servir a tela de cadastro de consultor
router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/cadastro/tipo_cadastro.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;