const express = require('express');
const { getTalker } = require('./talkerGet');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// req 1
app.get('/talker', async (_request, response) => {
  const talker = await getTalker();
  response.status(HTTP_OK_STATUS).json(JSON.parse(talker));
});

// não remova esse endpoint, e para o avaliador funcionar
// iniciando projeto
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
