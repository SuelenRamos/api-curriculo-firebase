module.exports = (req, res, next) => {
    if (req.user && req.user.admin === true) {
      next();
    } else {
      res.status(403).json({ error: 'Acesso negado. Você não é um administrador.' });
    }
  };
  