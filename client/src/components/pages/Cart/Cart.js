import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../../redux/cartSlice';
import { Link } from 'react-router-dom';
import CartProducts from '../../features/CartProducts/CartProducts';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
  };

  return cart?.length === 0 ? (
    <div>The cart is empty</div>
  ) : (
    <div>
      <CartProducts action='editable'></CartProducts>
      <div>
        <button onClick={handleClear}>clear the cart</button>
        <button>
          <Link to={`/checkout`}>go to checkout</Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
