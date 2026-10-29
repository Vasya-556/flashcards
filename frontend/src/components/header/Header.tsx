import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { routesConfig } from "../../configs";
import { Logout } from "../.";
import { useAuth } from "../../hooks";

function Header() {
  const auth = useAuth();
  return (
    <header className={styles.container}>
        <Link to={routesConfig.home.path}>Home</Link>
        {
          auth.auth ?
          <>
            <Logout/>
          </>
          : <>
            <Link to={routesConfig.signin.path}>Sign in</Link>
            <Link to={routesConfig.signup.path}>Sign up</Link>
          </>
        }
    </header>
  )
}

export default Header