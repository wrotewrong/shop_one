const fs = require('fs/promises');
const path = require('path');

const removeImage = async (img) => {
  const rootPath = path.join(__dirname, '..');
  const fullPath = rootPath + '/public/uploads/' + img;
  try {
    await fs.unlink(fullPath);
  } catch (err) {
    console.error('Error deleting file:', err);
  }
};

module.exports = removeImage;
