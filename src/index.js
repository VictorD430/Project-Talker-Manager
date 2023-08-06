const express = require('express');
const crypto = require('crypto'); // gerador de tokens
const { getTalker, getTalkerById } = require('./talkerGet');

const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
} = require('./middlewares/validation');
const { talkerAdd } = require('./talkerAdd');
const { talkerPut } = require('./talkerPut');
const { talkerDel } = require('./talkerDel');

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

// req 3 e req 4
app.post('/login', validateEmail, validatePassword, async (_request, response) => {
  const tokenGen = await crypto.randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token: `${tokenGen}` });
});

// req 5
app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  talkerAdd);

// req 6
app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (request, response) => {
    const { id } = request.params;
    const putTalker = await talkerPut(id, request.body);
    if (!putTalker) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(200).json(putTalker);
  });

// req 7
app.delete('/talker/:id', validateToken, talkerDel, async () => { });

// não remova esse endpoint, e para o avaliador funcionar
// iniciando projeto
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
