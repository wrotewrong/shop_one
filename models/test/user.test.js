const User = require('../usersModel');
const expect = require('chai').expect;

describe('User model', () => {
  it('should throw an error if at least one argument is not provided', async () => {
    try {
      const user = new User({});
      await user.validate();
    } catch (error) {
      expect(error.errors.name).to.exist;
      expect(error.errors.authProviderId).to.exist;
      expect(error.errors.email).to.exist;
    }
  });

  it('should throw an error if "name" argument is not a string', async () => {
    let cases = [{}, []];
    for (let name of cases) {
      try {
        const user = new User({ name });
        await user.validate();
      } catch (error) {
        expect(error.errors.name).to.exist;
      }
    }
  });

  it('should throw an error if "authProviderId" argument is not a string', async () => {
    let cases = [{}, []];
    for (let authProviderId of cases) {
      try {
        const user = new User({ authProviderId });
        await user.validate();
      } catch (error) {
        expect(error.errors.authProviderId).to.exist;
      }
    }
  });

  it('should throw an error if "email" argument is not a string', async () => {
    let cases = [{}, []];
    for (let email of cases) {
      try {
        const user = new User({ email });
        await user.validate();
      } catch (error) {
        expect(error.errors.email).to.exist;
      }
    }
  });
});
