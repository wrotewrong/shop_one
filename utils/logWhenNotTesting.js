const logWhenNotTesting = (message) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(message);
  }
};

module.exports = logWhenNotTesting;
