import ProductAmount from '../ProductAmount/ProductAmount';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../../redux/cartSlice';

const CartProducts = (props) => {
  const { action } = props;
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      {cart.map((cartProduct) => {
        return (
          <div key={cartProduct._id}>
            <div>{cartProduct.name}</div>
            <div>amount: {cartProduct.amount}</div>
            <div>price: {cartProduct.price * cartProduct.amount}</div>
            {action === 'editable' ? (
              <div>
                <ProductAmount>{cartProduct}</ProductAmount>
                <button onClick={() => handleRemove(cartProduct._id)}>
                  remove
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        );
      })}
      <div>{`Total price:${cart.reduce((a, b) => {
        return a + b.amount * b.price;
      }, 0)}`}</div>
    </div>
  );
};

export default CartProducts;
