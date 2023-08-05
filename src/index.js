const express = require('express');
const crypto = require('crypto'); // gerador de tokens
const { getTalker, getTalkerById } = require('./talkerGet');

const {
  validateEmail,
  validatePassword,
} = require('./middlewares/validation');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// req 1
app.get('/talker', async (_request, response) => {
  const talker = await getTalker();
  response.status(HTTP_OK_STATUS).json(JSON.parse(talker));
});

// req 2
app.get('/talker/:id', async (_request, response) => {
  const { id } = _request.params;
  const talkers = await getTalkerById(id);
  if (talkers) {
    response.status(HTTP_OK_STATUS).json(talkers);
    return;
  }
  response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// req 3
app.post('/login', validateEmail, validatePassword, async (_request, response) => {
  const tokenGen = await crypto.randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token: `${tokenGen}` });
});

// não remova esse endpoint, e para o avaliador funcionar
// iniciando projeto
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
