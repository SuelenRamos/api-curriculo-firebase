const admin = require('firebase-admin');
const serviceAccount = require('../chave-firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://curriculoauth-default-rtdb.firebaseio.com'
});

const verificaAutenticacao = async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = verificaAutenticacao;
