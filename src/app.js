const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mainRoutes = require('./routes/index'); // Importa as rotas
const consultorRoutes = require('./routes/consultorRoutes');
const responsavelRoutes = require('./routes/responsavelRoutes');
const instituicaoRoutes = require('./routes/instituicaoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, '../public')));

// Usando as rotas de consultor
app.use('/consultor', consultorRoutes);

// Usando as rotas de responsavel
app.use('/responsavel', responsavelRoutes);

// Usando as rotas de instituição
app.use('/instituicao', instituicaoRoutes);

// Usando as rotas principais
app.use('/', mainRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});