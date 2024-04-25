const Product = require('../../models/productsModel.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /products', () => {
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
    const anotherTestProduct = new Product({
      _id: '6624327aca894b49e9f99067',
      name: 'test2',
      price: 22,
      amount: 22,
      description: '2test test test test test test',
      img: 'avatar.jpg',
      date: '2024-04-04',
    });
    await anotherTestProduct.save();
  });

  it('/ should return all products', async () => {
    const res = await request(server).get('/products');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:id should return product by id ', async () => {
    const res = await request(server).get('/products/6624327aca894b49e9f99067');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('wrong /:id should return status 404 and return message "Not found..."', async () => {
    const res = await request(server).get('/products/6624327aca894b49e9f99068');

    expect(res.status).to.be.equal(404);
    expect(res.body.message).to.be.equal('Not found...');
  });

  it('invalid /:id should return status 500 and return error message', async () => {
    const res = await request(server).get(
      '/products/6624327aca894b49e9f9906xx'
    );

    expect(res.status).to.be.equal(500);
    expect(res.body.message).to.not.be.equal('Not found...');
    expect(res.body.message).to.not.be.equal('OK');
    expect(res.body.message).to.not.be.null;
  });

  after(async () => {
    await Product.deleteMany();
  });
});
