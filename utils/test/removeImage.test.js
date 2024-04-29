const fs = require('fs');
const removeImage = require('../removeImage');
const path = require('path');
const expect = require('chai').expect;

describe('UTILS removeImage', () => {
  const rootPath = path.join(__dirname, '../..');
  const fullPath = rootPath + '/public/uploads/testFile.img';

  it('should remove the file that it was given as argument', async () => {
    fs.writeFileSync(fullPath, 'This is a test file.');

    await removeImage('testFile.img');

    const fileExists = fs.existsSync(fullPath);

    expect(fileExists).to.be.false;

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  });
});
