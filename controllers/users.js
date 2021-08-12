const User = require('../models/user');
const { setError, handleError } = require('../utils/utils');

function handleUserError(error, response) {
  handleError(error, response, 'Пользователь не найден');
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleUserError(err, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) return setError();
      return res.send(user);
    })
    .catch((err) => handleUserError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => handleUserError(err, res));
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) return setError();
      return res.send(user);
    })
    .catch((err) => handleUserError(err, res));
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) return setError();
      return res.send(user);
    })
    .catch((err) => handleUserError(err, res));
};
