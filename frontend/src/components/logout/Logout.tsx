import styles from "./Logout.module.css";
import { authServices } from "../../services";
import { useAuth } from "../../stores";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../configs";

function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authServices.logout();
      auth.removeAuth();
      navigate(routesConfig.home.path);
    }
    catch (error){
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <Button
        onClick={handleLogout}
        category="blue"
        text="Log out"
      />
    </div>
  )
}

export default Logout
