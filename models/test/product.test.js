const Product = require('../productsModel');
const expect = require('chai').expect;
const {
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_PRICE_MIN,
  PRODUCT_PRICE_MAX,
  PRODUCT_AMOUNT_MIN,
  PRODUCT_AMOUNT_MAX,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
} = require('../../config/backendConfig');

describe('Product model', () => {
  it('should throw an error if at least one argument is not provided', async () => {
    const product = new Product({});
    try {
      await product.validate();
    } catch (error) {
      expect(error.errors.name).to.exist;
      expect(error.errors.price).to.exist;
      expect(error.errors.amount).to.exist;
      expect(error.errors.description).to.exist;
      expect(error.errors.img).to.exist;
      expect(error.errors.date).to.exist;
    }
  });

  it(`should throw an error if "name" argument is not a string`, async () => {
    const cases = [{}, []];
    for (let name of cases) {
      const product = new Product({ name });
      try {
        await product.validate();
      } catch (error) {
        expect(error.errors.name).to.exist;
      }
    }
  });

  it(`should throw an error if "name" argument is shorther than ${PRODUCT_NAME_MIN_LENGTH} or longer than ${PRODUCT_NAME_MAX_LENGTH} characters`, async () => {
    const cases = ['', 'very long testing name test test test'];
    for (let name of cases) {
      const product = new Product({ name });
      try {
        await product.validate();
      } catch (error) {
        expect(error.errors.name).to.exist;
      }
    }
  });

  it(`should throw an error if "price" argument is not a number`, async () => {
    const cases = [{}, []];
    for (let price of cases) {
      const product = new Product({ price });
      try {
        await product.validate();
      } catch (error) {
        expect(error.errors.price).to.exist;
      }
    }
  });

  it(`should throw an error if "price" argument is lower than ${PRODUCT_PRICE_MIN} or higher than ${PRODUCT_PRICE_MAX}`, async () => {
    const cases = [-1, 10001];
    for (let price of cases) {
      const product = new Product({ price });
      try {
        await product.validate();
      } catch (error) {
        expect(error.errors.price).to.exist;
      }
    }
  });

  it(`should throw an error if "amount" argument is not a number`, async () => {
    const cases = [{}, []];
    for (let amount of cases) {
      const product = new Product({ amount });
      try {
        await product.validate();
      } catch (error) {
        expect(error.errors.amount).to.exist;
      }
    }
  });

  it(`should throw an error if "amount" argument is lower than ${PRODUCT_AMOUNT_MIN} or higher than ${PRODUCT_AMOUNT_MAX}`, async () => {
    const cases = [-1, 10001];
    for (let amount of cases) {
      const product = new Product({ amount });
      try {
        await product.validate();
      } catch (error) {
        expect(error.errors.amount).to.exist;
      }
    }
  });

  it(`should throw an error if "description" argument is not a string`, async () => {
    const cases = [{}, []];
    for (let description of cases) {
      const product = new Product({ description });
      try {
        await product.validate();
      } catch (error) {
        expect(error.errors.description).to.exist;
      }
    }
  });

  it(`should throw an error if "description" argument is lower than ${PRODUCT_DESCRIPTION_MIN_LENGTH} or higher than ${PRODUCT_DESCRIPTION_MAX_LENGTH}`, async () => {
    const cases = [
      'shorter description',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus metus massa, a blandit turpis convallis a. Etiam porttitor eu neque in iaculis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam sed mauris magna. Sed sit amet nulla vel neque lobortis pellentesque sit amet sed eros. Phasellus ornare metus neque, sed elementum lorem semper non. Sed vel consequat lectus. Curabitur quis magna odio. Pellentesque a pulvinar nulla. Ut ligula neque, eleifend non quam eleifend, lacinia tincidunt elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer ornare quam at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus metus massa, a blandit turpis convallis a. Etiam porttitor eu neque in iaculis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam sed mauris magna. Sed sit amet nulla vel neque lobortis pellentesque sit amet sed eros. Phasellus ornare metus neque, sed elementum lorem semper non. Sed vel consequat lectus. Curabitur quis magna odio. Pellentesque a pulvinar nulla. Ut ligula neque, eleifend non quam eleifend, lacinia tincidunt elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer ornare quam at. ',
    ];
    for (let description of cases) {
      const product = new Product({ description });
      try {
        await product.validate();
      } catch (error) {
        expect(error.errors.description).to.exist;
      }
    }
  });

  it(`should throw an error if "img" argument is not a string`, async () => {
    const cases = [{}, []];
    for (let img of cases) {
      const product = new Product({ img });
      try {
        await product.validate();
      } catch (error) {
        expect(error.errors.img).to.exist;
      }
    }
  });

  it(`should throw an error if "date" argument is not a string`, async () => {
    const cases = [{}, []];
    for (let date of cases) {
      const product = new Product({ date });
      try {
        await product.validate();
      } catch (error) {
        expect(error.errors.date).to.exist;
      }
    }
  });
});
