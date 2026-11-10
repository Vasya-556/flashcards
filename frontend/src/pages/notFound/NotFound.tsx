import styles from "./NotFound.module.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>Oops, page not found :(</h1>
      <Button
        onClick={() => navigate(-1)}
        category="blue"
        text="Back"
      />
    </div>
  )
}

export default NotFound
