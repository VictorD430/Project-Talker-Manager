// https://stackoverflow.com/questions/60575092/how-to-pass-req-user-from-express-validator-to-next-middleware
// como fazer a validação passar adiante

// req 4
const validateEmail = (request, response, next) => {
  const { email } = request.body;
  console.log('email', email);
  if (!email || email === '') {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const validEmail = emailRegex.test(email);
  if (!validEmail) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};
const validatePassword = (request, response, next) => {
  const { password } = request.body;
  if (!password || password === '') {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};
// req 5
const validateToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (typeof authorization !== 'string' || authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};
const validateName = (request, response, next) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};
const validateAge = (request, response, next) => {
  const { age } = request.body;
  if (!age || age === undefined) {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18 || !Number.isInteger(age)) {
    return response.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};
const validateTalk = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || talk === undefined) {
    return response.status(400)
      .json({
        message: 'O campo "talk" é obrigatório' });
  }
  next();
};
const validateRate = (request, response, next) => {
  const { talk: { rate } } = request.body;
  if (rate === undefined) {
    return response.status(400)
      .json({
        message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return response.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};
const validateWatchedAt = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;
  if (!watchedAt || watchedAt === undefined) {
    return response.status(400)
      .json({
        message: 'O campo "watchedAt" é obrigatório' });
  }
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/.test(watchedAt);
  if (!regex) {
    return response.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
};