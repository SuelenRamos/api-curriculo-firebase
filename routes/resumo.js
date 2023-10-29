const express = require('express');
const router = express.Router();
const pool = require('../database');
const verificaAutenticacao = require('../middlewares/autenticacao');

router.post('/', verificaAutenticacao, async (req, res) => {
    const { descricao } = req.body;
  
    try {
        // Verificar se o resumo já existe no banco de dados
        const existingResumo = await pool.query('SELECT * FROM resumo');
        if (existingResumo.rows.length > 0) {
            // Se o resumo existir
            const updateResult = await pool.query('UPDATE resumo SET descricao = $1 RETURNING *', [descricao]);
            res.json({ success: true, message: 'Resumo atualizado com sucesso' });
        } else {
            // Se o resumo não existir, crie um novo
            const createResult = await pool.query('INSERT INTO resumo (descricao) VALUES ($1) RETURNING *', [descricao]);
            res.json({ success: true, message: 'Resumo inserido com sucesso' });
        }
    } catch (error) {
        console.error('Erro ao inserir/atualizar no banco de dados', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
