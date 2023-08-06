const fs = require('fs').promises;
const path = require('path');
const { getTalker } = require('./talkerGet');

const talkersPath = path.resolve(__dirname, './talker.json');

const talkerPut = async (id, talker) => {
  const data = await getTalker();
  const talkers = JSON.parse(data);
  const talkerFind = talkers.find((talk) => talk.id === Number(id));
  if (!talkerFind) return null;
  const talkerNewId = Object.assign(talkerFind, talker);
  talkers.forEach((element, index) => {
    if (element.id === Number(id)) {
      talkers[index] = talkerNewId;
    }
  });
  await fs.writeFile(talkersPath, JSON.stringify(talkers));
  return talkerNewId;
};

module.exports = { talkerPut };