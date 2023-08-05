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

module.exports = {
  validateEmail,
  validatePassword,
};