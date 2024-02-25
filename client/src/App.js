import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from './redux/productsSlice';

function App() {
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
              <div>
                <button onClick={() => dispatch(removeProduct(product.id))}>
                  remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={() => dispatch(addProduct())}>add</button>
      </div>
    </div>
  );
}

export default App;
