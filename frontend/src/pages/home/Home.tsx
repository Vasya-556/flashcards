import styles from "./Home.module.css";
import { 
  Link,
 } from "react-router-dom";
import { routesConfig } from "../../configs";
import { DeckList } from "../../components";

function Home() {
  return (
    <div className={styles.container}>
      <Link to={routesConfig.newDeck.path}>New deck</Link>
      <DeckList/>
    </div>
  )
}

export default Home