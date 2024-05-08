const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/usersModel');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.AUTH_SERVER_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ authProviderId: profile.id });
      if (!user) {
        const newUser = new User({
          name: profile.name.givenName,
          authProviderId: profile.id,
          email: profile.emails[0].value,
        });
        await newUser.save();
        console.log(`User with id: ${profile.id} created`);
      } else {
        console.log(`User with id: ${profile.id} already exist`);
      }
      done(null, profile);
    }
  )
);

passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});
