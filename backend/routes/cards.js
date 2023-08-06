const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCars,
  createNewCard,
  deleteCardById,
  setLikesCard,
  removeLikesCard,
} = require('../controllers/cards');

router.get('/', getCars);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(/https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\.\+~#=//?&]*)/i).required(),
  }),
}), createNewCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCardById);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), setLikesCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), removeLikesCard);

module.exports = router;
