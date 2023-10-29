require('dotenv').config();
const express = require('express');
const autenticacaoMiddleware = require('./middlewares/autenticacao');
const autorizacaoMiddleware = require('./middlewares/autorizacao');
const experienciasRoutes = require('./routes/experiencias');
const educacaoRoutes = require('./routes/educacao');
const certificacoesRoutes = require('./routes/certificacoes');
const resumoRoutes = require('./routes/resumo');

const app = express();
app.use(express.json());

app.use('/experiencias', autenticacaoMiddleware, autorizacaoMiddleware, experienciasRoutes);
app.use('/educacao', autenticacaoMiddleware, autorizacaoMiddleware, educacaoRoutes);
app.use('/certificacoes', autenticacaoMiddleware, autorizacaoMiddleware, certificacoesRoutes);
app.use('/resumo', autenticacaoMiddleware, resumoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
