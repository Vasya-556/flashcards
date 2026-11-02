import styles from "./Home.module.css";
import { 
  Link,
 } from "react-router-dom";
import { routesConfig } from "../../configs";
import { DeckList } from "../../components";
import { useAuth } from "../../hooks";

function Home() {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      {
        auth.auth
        ? <>
          <Link to={routesConfig.newDeck.path}>New deck</Link>
          <DeckList/>
        </>
        : <>
        </>
      }
    </div>
  )
}

export default Home