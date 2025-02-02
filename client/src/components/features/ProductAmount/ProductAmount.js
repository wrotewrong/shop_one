import { useState } from 'react';

const ProductAmount = (product) => {
  const [amount, setAmount] = useState('1');

  const addToCart = () => {
    console.log(amount);
  };

  return (
    <div>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductAmount;
