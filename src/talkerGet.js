const fs = require('fs').promises;
const path = require('path');

const talkers = path.resolve(__dirname, './talker.json');

const getTalker = async () => {
  const talker = await fs.readFile(talkers, 'utf-8');
  return talker;
};

const getTalkerById = async (id) => {
  const getAll = await getTalker();
  const allId = JSON.parse(getAll);
  const findId = allId.find((talker) => talker.id === Number(id));
  return findId;
};

module.exports = { getTalker, getTalkerById };