const express = require('express');
const router = express.Router();
const pool = require('../database');
const verificaAutenticacao = require('../middlewares/autenticacao');
const verificaAdmin = require('../middlewares/autorizacao');

router.post('/', verificaAutenticacao, verificaAdmin, async (req, res) => {
  const { instituicao, curso, periodo } = req.body;

  try {
    const result = await pool.query('INSERT INTO educacao (instituicao, curso, periodo) VALUES ($1, $2, $3) RETURNING *', [instituicao, curso, periodo]);
    res.json({ success: true, message: 'Educação inserida com sucesso' });
  } catch (error) {
    console.error('Erro ao inserir no banco de dados', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
