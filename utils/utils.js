function setError() {
  const error = new Error();
  error.name = 'NotFound';
  return Promise.reject(error);
}

function handleError(error, response, notFoundMessage) {
  switch (error.name) {
    case 'CastError':
      response.status(400).send({ message: 'Невалидный id' });
      break;
    case 'NotFound':
      response.status(404).send({ message: notFoundMessage });
      break;
    case 'ValidationError':
      response.status(400).send({ message: 'Переданы некорректные данные' });
      break;
    default:
      response.status(500).send({ message: 'Что-то пошло не так :(' });
  }
}

module.exports = {
  setError,
  handleError,
};
