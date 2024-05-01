import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/products'}>Products</NavLink>
        </li>
        <li>
          <NavLink to={'/add'}>Add Product</NavLink>
        </li>
        <li>
          <NavLink to={'/cart'}>Cart</NavLink>
        </li>
        <li>
          <a href='/auth/google'>login</a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
