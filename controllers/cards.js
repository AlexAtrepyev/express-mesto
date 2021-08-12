const Card = require('../models/card');

function setError() {
  const error = new Error();
  error.name = 'NotFound';
  return Promise.reject(error);
}

function handleError(error, response) {
  switch (error.name) {
    case 'NotFound':
      response.status(404).send({ message: 'Карточка не найдена' });
      break;
    case 'ValidationError':
      response.status(400).send({ message: 'Переданы некорректные данные' });
      break;
    default:
      response.status(500).send({ message: 'Что-то пошло не так :(' });
  }
}

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(JSON.stringify(cards)))
    .catch((err) => handleError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(JSON.stringify(card)))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) return setError();
      return res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) return setError();
      return res.send(JSON.stringify(card));
    })
    .catch((err) => handleError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) return setError();
      return res.send(JSON.stringify(card));
    })
    .catch((err) => handleError(err, res));
};
