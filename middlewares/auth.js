const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) throw new AuthError(401, 'Необходима авторизация');

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new AuthError(401, 'Необходима авторизация');
  }
  req.user = payload;

  next();
};
