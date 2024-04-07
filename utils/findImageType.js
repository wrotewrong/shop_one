const fs = require('fs');

const findImageType = async (image) => {
  const determineHeader = () =>
    new Promise((resolve, reject) => {
      try {
        const file = fs.readFileSync(image.path, null).buffer;
        const arr = new Uint8Array(file).subarray(0, 4);
        const header = arr.reduce(
          (result, byte) => result + byte.toString(16),
          ''
        );
        resolve(header);
      } catch (err) {
        reject(err);
      }
    });

  try {
    const header = await determineHeader();

    switch (header) {
      case '89504e47':
      case '4d4d4d4d':
      case '52494646':
      case '89504e46':
      case '89504e48':
      case '89504e44':
      case '89504e5a':
      case '89504e2d':
      case '89504e43':
      case '89504e52':
        return 'image/png';
      case '47494638':
        return 'image/gif';
      case 'ffd8ffe0':
      case 'ffd8ffe1':
      case 'ffd8ffe2':
      case 'ffd8ffe3':
      case 'ffd8ffe8':
      case 'ffd8ffdb':
      case 'ffd8ffc0':
      case 'ffd8ffc4':
      case 'ffd8ffda':
        return 'image/jpeg';
      default:
        return 'unknown';
    }
  } catch (err) {
    return 'unknown';
  }
};

module.exports = findImageType;
