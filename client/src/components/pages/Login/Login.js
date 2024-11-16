import { API_URL } from '../../../config';

const Login = () => {
  return (
    <div>
      Login
      <a href={`${API_URL}/auth/google`}>Login with Google</a>
    </div>
  );
};

export default Login;
