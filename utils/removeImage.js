const fs = require('fs');
const path = require('path');

const removeImage = (img) => {
  const rootPath = path.join(__dirname, '..');
  const fullPath = rootPath + '/public/uploads/' + img;

  fs.stat(fullPath, (err) => {
    if (err) {
      console.error('Error checking file status:', err);
      return;
    }
    fs.unlinkSync(fullPath);
  });
};

module.exports = removeImage;
