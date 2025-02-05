const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Importando o módulo path
const consultorRoutes = require('./routes/consultorRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usando as rotas
app.use('/consultor', consultorRoutes);

// Rota para servir a tela de cadastro de consultor
app.get('/cadastro/consultor', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/cadastro/cadastro_consultor.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});