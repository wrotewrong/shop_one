const express = require('express');
const passport = require('passport');
const router = express.Router();
require('dotenv').config();

let AUTH_REDIRECT_URL = '';
if (process.env.NODE_ENV === 'development') {
  AUTH_REDIRECT_URL = 'http://localhost:3000';
}

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${AUTH_REDIRECT_URL}/user/no-permission`,
  }),
  (req, res) => {
    res.redirect(`${AUTH_REDIRECT_URL}/user/logged`);
  }
);

module.exports = router;
