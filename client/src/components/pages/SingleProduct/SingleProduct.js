import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { deleteProducts, getProductById } from '../../../redux/productsSlice';
import { useEffect } from 'react';
import ProductAmount from '../../features/ProductAmount/ProductAmount';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const selectedProduct = useSelector((state) =>
    state.products.products.find((product) => product._id === productId)
  );

  const handleDelete = () => {
    dispatch(deleteProducts(selectedProduct?._id));
    navigate('/products');
  };

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  return (
    <div>
      SingleProduct {selectedProduct?._id}
      <div>{selectedProduct?.name}</div>
      <div>{selectedProduct?.price}</div>
      <div>{selectedProduct?.description}</div>
      <ProductAmount>{selectedProduct}</ProductAmount>
      <button>
        <NavLink to={`/products/${productId}/edit`}>Edit</NavLink>
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default SingleProduct;
