import { useSelector } from 'react-redux';
import ProductAmount from '../../features/ProductAmount/ProductAmount';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);

  const handleClear = () => {
    console.log('clear');
  };

  const handleRemove = () => {
    console.log('remove');
  };

  return cart.length === 0 ? (
    <div>xd</div>
  ) : (
    <div>
      {cart.map((cartProduct) => {
        return (
          <div key={cartProduct._id}>
            <div>{cartProduct.name}</div>
            <div>{cartProduct.amount}</div>
            <div>{cartProduct.price * cartProduct.amount}</div>
            <ProductAmount>{cartProduct}</ProductAmount>
            <button onClick={handleRemove}>remove</button>
          </div>
        );
      })}
      <div>{`Total price:${cart.reduce(
        (a, b) => a.amount * a.price + b.amount * b.price
      )}`}</div>
      <button onClick={handleClear}>clear the cart</button>
    </div>
  );
};

export default Cart;
