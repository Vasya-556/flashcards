import styles from "./Login.module.css";
import { GoogleLogin } from '@react-oauth/google';
import { authServices } from "../../services";
import { useAuth } from "../../hooks";

function Login() {
  const auth = useAuth();
  const handleLogin = async (credentialResponse: {credential?: string}) => {
    const idToken = credentialResponse.credential;

    if (!idToken){
      return
    }

    const user = await authServices.login({idToken});
    auth.setAuth(user);
  }
  
  const handleError = () => {
    console.error("Can't login")
  }
  
  return (
    <div className={styles.container}>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={handleError}
        />
    </div>
  )
}

export default Login
