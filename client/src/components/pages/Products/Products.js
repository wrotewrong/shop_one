import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../../redux/productsSlice';

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <div>
        {products.map((product) => {
          return (
            <div key={product._id}>
              <div>{product.name}</div>
              <div>{product.price}</div>
              <div>{product.description}</div>
              <button>
                <Link to={`/products/${product.id}`}>Details</Link>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
