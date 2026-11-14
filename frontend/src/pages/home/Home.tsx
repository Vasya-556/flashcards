import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../configs";
import { useAuth } from "../../stores";
import DeckList from "../../components/deckList/DeckList";
import Button from "../../components/button/Button";

function Home() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {
        auth.auth
        ? <>
          <Button
            onClick={() => navigate(routesConfig.newDeck.path)}
            category="blue"
            text="New deck"
          />
          <DeckList/>
        </>
        : <>
          <p>Backend may be down or sleeping, please wait a moment</p>
          <p>You're logged out. Please log in</p>
        </>
      }
    </div>
  )
}

export default Home