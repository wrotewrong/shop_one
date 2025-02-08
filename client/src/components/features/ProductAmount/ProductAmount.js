import { useState } from 'react';
import { addToCart } from '../../../redux/cartSlice';
import { useDispatch } from 'react-redux';

const ProductAmount = (product) => {
  const { _id, name, price, img } = product.children;
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('1');

  const handleAddToCart = () => {
    dispatch(addToCart({ _id, name, price, img, amount: Number(amount) }));
  };

  return (
    <div>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductAmount;
