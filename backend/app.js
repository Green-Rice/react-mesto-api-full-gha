const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { login, createNewUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const errorsHandler = require('./middlewares/errorsHandler');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');

const { PORT = 4000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use(requestLogger)

app.use(bodyParser.json());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\.\+~#=//?&]*)/i),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createNewUser);

app.use(auth);

app.use('/cards', routerCard);
app.use('/users', routerUser);

app.use('/*', () => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
