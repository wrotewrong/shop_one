const Product = require('../../models/productsModel.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /products', () => {
  before(async () => {
    const testProduct = new Product({
      _id: '6624327aca894b49e9f99066',
      name: 'test',
      price: 12,
      amount: 2,
      description: 'test test test test test test',
      img: 'avatar.jpg',
      date: '2024-04-04',
    });
    await testProduct.save();
  });

  it('/:id should delte specific product and return success', async () => {
    const res = await request(server).delete(
      '/products/6624327aca894b49e9f99066'
    );
    const deletedProduct = await Product.findOne({
      _id: '6624327aca894b49e9f99066',
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deletedProduct).to.be.null;
  });

  after(async () => {
    await Product.deleteMany();
  });
});
