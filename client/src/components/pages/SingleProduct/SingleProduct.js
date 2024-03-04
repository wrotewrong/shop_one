import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { productId } = useParams();
  const selectedProduct = useSelector((state) =>
    state.products.find((product) => product.id === productId)
  );

  return (
    <div>
      SingleProduct {selectedProduct.id}
      <div>{selectedProduct.name}</div>
      <div>{selectedProduct.price}</div>
      <div>{selectedProduct.description}</div>
    </div>
  );
};

export default SingleProduct;
