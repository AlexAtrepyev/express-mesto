const User = require('../models/user');

function setError() {
  const error = new Error();
  error.name = 'NotFound';
  return Promise.reject(error);
}

function handleError(error, response) {
  switch (error.name) {
    case 'NotFound':
      response.status(404).send({ message: 'Пользователь не найден' });
      break;
    case 'ValidationError':
      response.status(400).send({ message: 'Переданы некорректные данные' });
      break;
    default:
      response.status(500).send({ message: 'Что-то пошло не так :(' });
  }
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(JSON.stringify(users)))
    .catch((err) => handleError(err, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) return setError();
      return res.send(JSON.stringify(user));
    })
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(JSON.stringify(user)))
    .catch((err) => handleError(err, res));
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) return setError();
      return res.send(JSON.stringify(user));
    })
    .catch((err) => handleError(err, res));
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) return setError();
      return res.send(JSON.stringify(user));
    })
    .catch((err) => handleError(err, res));
};
