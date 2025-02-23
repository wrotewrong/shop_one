import { useDispatch } from 'react-redux';
// import { addProduct, removeProduct } from './redux/productsSlice';
import Nav from './components/layout/Nav/Nav';
// import Main from './components/layout/Main/Main';
import Footer from './components/layout/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import Cart from './components/pages/Cart/Cart';
import Checkout from './components/pages/Checkout/Checkout';
import Products from './components/pages/Products/Products';
import Login from './components/pages/Login/Login';
import SingleProduct from './components/pages/SingleProduct/SingleProduct';
import AddProduct from './components/pages/AddProduct/AddProduct';
// import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProducts } from './redux/productsSlice';
import UserLogged from './components/pages/UserLogged/UserLogged';
import NotAuthorized from './components/pages/NotAuthorized/NotAuthorized';
import EditProduct from './components/pages/EditProduct/EditProduct';

function App() {
  // const products = useSelector((state) => state.products);
  // const dispatch = useDispatch();

  // const { productId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      {/* <div>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>{product.price}</div>
              <div>{product.description}</div>
              <div>
                <button onClick={() => dispatch(removeProduct(product.id))}>
                  remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={() => dispatch(addProduct())}>add</button>
      </div> */}
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/products/:productId' element={<SingleProduct />}></Route>
        <Route
          path='/products/:productId/edit'
          element={<EditProduct />}
        ></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
        <Route path='/add' element={<AddProduct />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/user/logged' element={<UserLogged />}></Route>
        <Route path='/user/no-permission' element={<NotAuthorized />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
