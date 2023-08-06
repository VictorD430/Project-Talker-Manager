const fs = require('fs').promises;
const path = require('path');
const { getTalker } = require('./talkerGet');

const talkersPath = path.resolve(__dirname, './talker.json');

const talkerDel = async (request, response) => {
  try {
    const data = await getTalker();
    const talkers = JSON.parse(data);
    const talkerFilter = talkers.filter((talk) => talk.id !== Number(request.params.id));
    await fs.writeFile(talkersPath, JSON.stringify(talkerFilter));
    return response.status(204)
      .json({ message: '' });
  } catch (e) { return response.status(400).json({ message: e.message }); }
};

module.exports = { talkerDel };