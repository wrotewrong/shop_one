const logWhenNotTesting = require('../utils/logWhenNotTesting');

exports.userLogged = async (req, res) => {
  try {
    res.status(200).json({ message: 'OK' });
    logWhenNotTesting(`User id: ${req.user.id} logged in`);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logWhenNotTesting(err.message);
  }
};

exports.noPermission = async (req, res) => {
  try {
    res.status(400).json({ message: 'You are not authorized' });
    logWhenNotTesting('You are not authorized');
  } catch (err) {
    res.status(500).json({ message: err.message });
    logWhenNotTesting(err.message);
  }
};
