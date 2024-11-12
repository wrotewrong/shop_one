import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { productId } = useParams();
  const selectedProduct = useSelector((state) =>
    state.products.products.find((product) => product._id === productId)
  );

  return (
    <div>
      SingleProduct {selectedProduct?._id}
      <div>{selectedProduct?.name}</div>
      <div>{selectedProduct?.price}</div>
      <div>{selectedProduct?.description}</div>
    </div>
  );
};

export default SingleProduct;
