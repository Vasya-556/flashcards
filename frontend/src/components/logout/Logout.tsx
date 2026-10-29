import styles from "./Logout.module.css";
import { authServices } from "../../services";
import { useAuth } from "../../hooks";

function Logout() {
  const auth = useAuth();
  const handleLogout = async () => {
    try {
      await authServices.logout();
      auth.removeAuth();
    }
    catch (error){
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default Logout
