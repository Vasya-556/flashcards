import styles from "./Login.module.css";
import { GoogleLogin } from '@react-oauth/google';
import { authServices } from "../../services";
import { useAuth } from "../../stores";
import { useNavigate } from "react-router-dom";
import { 
  routesConfig,
  authConfig
 } from "../../configs";
import { GoogleOAuthProvider } from '@react-oauth/google';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse: {credential?: string}) => {
    const idToken = credentialResponse.credential;

    if (!idToken){
      return
    }

    const user = await authServices.login({idToken});
    auth.setAuth(user);
    navigate(routesConfig.home.path);
  }
  
  const handleError = () => {
    console.error("Can't login")
  }
  
  return (
    <div className={styles.container}>
      <GoogleOAuthProvider 
        clientId={authConfig.googleClientId}
        locale="en"
        >
        <GoogleLogin
          onSuccess={handleLogin}
          onError={handleError}
          theme="filled_black"
          size="medium"
          shape="rectangular"
        />
      </GoogleOAuthProvider>
    </div>
  )
}

export default Login
