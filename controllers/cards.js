const Card = require('../models/card');
const { setError, handleError } = require('../utils/utils');

function handleCardError(error, response) {
  handleError(error, response, 'Карточка не найдена');
}

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleCardError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => handleCardError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) return setError();
      return res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => handleCardError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) return setError();
      return res.send(card);
    })
    .catch((err) => handleCardError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) return setError();
      return res.send(card);
    })
    .catch((err) => handleCardError(err, res));
};
