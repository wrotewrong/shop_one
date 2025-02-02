import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductAmount from '../../features/ProductAmount/ProductAmount';

const Products = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <div>
      {products.length > 0 ? (
        <div>
          {products.map((product) => {
            return (
              <div key={product._id}>
                <div>{product.name}</div>
                <div>{`price: ${product.price}`}</div>
                <div>{product.description}</div>
                <button>
                  <Link to={`/products/${product._id}`}>Details</Link>
                </button>
                <ProductAmount>{product}</ProductAmount>
              </div>
            );
          })}
        </div>
      ) : (
        <p>There are no products in the database</p>
      )}
    </div>
  );
};

export default Products;
