import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/productsSlice';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>{product.price}</div>
              <div>{product.description}</div>
              <button>
                <Link to={`/products/${product.id}`}>Details</Link>
              </button>
            </div>
          );
        })}
        <div>
          <button onClick={() => dispatch(addProduct())}>add</button>
        </div>
      </div>
    </div>
  );
};

export default Products;
