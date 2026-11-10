import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../configs";
import { Logout } from "../.";
import { useAuth } from "../../hooks";
import Button from "../button/Button";

function Header() {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Button
          onClick={() => navigate(routesConfig.home.path)}
          text="Home"
          category="blue"
        />
        {
          auth.auth ?
          <>
            <Logout/>
          </>
          : 
          <>
            <Button
              onClick={() => navigate(routesConfig.login.path)}
              text="Log in"
              category="blue"
            />
          </>
        }
      </div>
    </header>
  )
}

export default Header