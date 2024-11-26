import ProductForm from '../../features/ProductForm/ProductForm';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { getProductById } from '../../../redux/productsSlice';

const EditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const product = useSelector((state) => state.products.singleProduct);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductForm action='edit' {...product} />
    </div>
  );
};

export default EditProduct;
