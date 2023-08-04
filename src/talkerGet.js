const fs = require('fs').promises;
const path = require('path');

const talkers = path.resolve(__dirname, './talker.json');

const getTalker = async () => {
  const talker = await fs.readFile(talkers, 'utf-8');
  return talker;
};

module.exports = { getTalker };