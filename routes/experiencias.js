const express = require('express');
const router = express.Router();
const pool = require('../database');
const verificaAutenticacao = require('../middlewares/autenticacao');
const verificaAdmin = require('../middlewares/autorizacao');

router.post('/', verificaAutenticacao, verificaAdmin, async (req, res) => {
  const { cargo, empresa, periodo } = req.body;

  try {
    const result = await pool.query('INSERT INTO experiencia (cargo, empresa, periodo) VALUES ($1, $2, $3) RETURNING *', [cargo, empresa, periodo]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao inserir no banco de dados', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
