const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

const getCars = (_req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

const createNewCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      return next(err);
    });
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Нет прав на удаление карточки'));
      }
      Card.findByIdAndRemove(cardId)
        .then((user) => res.status(201).send(user));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Введены не верные данные id карточки'));
      }
      return next(err);
    });
};

const setLikesCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        throw new NotFoundError('Запрашиваемый карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Введены не верные данные id карточки'));
      }
      return next(err);
    });
};

const removeLikesCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый карточка не найдена');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Введены не верные данные id карточки'));
      }
      return next(err);
    });
};

module.exports = {
  getCars, createNewCard, deleteCardById, setLikesCard, removeLikesCard,
};
