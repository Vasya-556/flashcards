import styles from "./DeckList.module.css";
import { deckServices } from "../../services";
import { 
  useEffect,
  useState
 } from "react";
import { 
  Link,
  generatePath
 } from "react-router-dom";
import { routesConfig } from "../../configs";

function DeckList() {
  const [decks, setDecks] = useState<{name: string, _id: string}[]|null>(null);

  const set = async () => {
    const decks = await deckServices.getDecks();
    setDecks(decks);
  }

  useEffect(() => {
    set();
  }, [])

  const handleDelete = async (deckId: string) => {
    await deckServices.deleteDeck(deckId);
    await set();
  }

  return (
    <div className={styles.container}>
      {
        decks ? decks.map((deck, index) => (
          <div key={index}>
            <p>{deck.name}</p>
            <Link to={generatePath(routesConfig.editDeck.path, { id: deck._id})}>Edit</Link><br/>
            <Link to={generatePath(routesConfig.learn.path, { id: deck._id})}>Learn</Link>
            <button onClick={() => handleDelete(deck._id)}>delete</button>
          </div>
        ))
        : <></>
      }
    </div>
  )
}

export default DeckList
