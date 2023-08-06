const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const UnauthorisedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (link) => isURL(link),
      message: 'Не верный формат ссылки',
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (link) => isEmail(link),
      message: 'Не верный формат ссылки',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorisedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorisedError('Неправильные почта или пароль');
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
