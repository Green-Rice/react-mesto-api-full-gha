const UnauthorisedError = require('../errors/UnauthorizedError');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers.authorization)
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorisedError('111 Необходима авторизация');
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(
      token,
      'dev-secret',
    );
    console.log(payload)
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new UnauthorisedError(`${payload}'222 Необходима авторизация'`));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
