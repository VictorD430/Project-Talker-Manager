const fs = require('fs').promises;
const path = require('path');
const { getTalker } = require('./talkerGet');

const talkersPath = path.resolve(__dirname, './talker.json');

const talkerAdd = async (request, response) => {
  const data = await getTalker();
  const talkers = JSON.parse(data);
  const newTalker = talkers[talkers.length - 1].id + 1;
  talkers.push({ id: newTalker, ...request.body });
  await fs.writeFile(talkersPath, JSON.stringify(talkers));
  return response.status(201).json({ id: newTalker, ...request.body });
};

module.exports = { talkerAdd };