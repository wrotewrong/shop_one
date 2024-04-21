const Product = require('../../models/productsModel.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const fs = require('fs');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /products', () => {
  it('should insert new product to the database and return success', async () => {
    const res = await request(server)
      .post('/products')
      .field('name', 'test')
      .field('price', '12')
      .field('amount', '2')
      .field('description', 'test test test test test test')
      .attach(
        'uploaded_file',
        fs.readFileSync(__dirname + '/testPic.jpg'),
        'testPic.jpg'
      );
    const product = await Product.findOne({ name: 'test' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(product).to.not.be.null;
  });

  after(async () => {
    const product = await Product.findOne({ name: 'test' });
    fs.unlinkSync(__dirname + '/../../public/uploads/' + product.img);
    await Product.deleteMany();
  });
});
