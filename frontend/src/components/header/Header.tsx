import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../configs";
import { Logout } from "../.";
import { useAuth } from "../../hooks";
import Button from "../button/Button";
import ThemeToggle from "../themeToggle/ThemeToggle";

function Header() {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <header className={styles.container}>
      <div className={styles.content}>
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
        <Button
          onClick={() => navigate(routesConfig.home.path)}
          text="Home"
          category="blue"
        />
        <ThemeToggle/>
      </div>
    </header>
  )
}

export default Header