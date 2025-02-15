import { useSelector, useDispatch } from 'react-redux';
import ProductAmount from '../../features/ProductAmount/ProductAmount';
import { removeFromCart, clearCart } from '../../../redux/cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return cart?.length === 0 ? (
    <div>The cart is empty</div>
  ) : (
    <div>
      {cart.map((cartProduct) => {
        return (
          <div key={cartProduct._id}>
            <div>{cartProduct.name}</div>
            <div>amount: {cartProduct.amount}</div>
            <div>price: {cartProduct.price * cartProduct.amount}</div>
            <ProductAmount>{cartProduct}</ProductAmount>
            <button onClick={() => handleRemove(cartProduct._id)}>
              remove
            </button>
          </div>
        );
      })}
      <div>{`Total price:${cart.reduce((a, b) => {
        return a + b.amount * b.price;
      }, 0)}`}</div>
      <button onClick={handleClear}>clear the cart</button>
    </div>
  );
};

export default Cart;
