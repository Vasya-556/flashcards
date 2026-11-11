import styles from "./DeckList.module.css";
import { deckServices } from "../../services";
import { 
  useEffect,
  useState
 } from "react";
import { 
  generatePath,
  useNavigate,
 } from "react-router-dom";
import { routesConfig } from "../../configs";
import Button from "../button/Button";

function DeckList() {
  const [decks, setDecks] = useState<{name: string, _id: string}[]|null>(null);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadDecks = async () => {
      try {
        const decks = await deckServices.getDecks();
        setDecks(decks);
      }
      catch{
        setDecks([]);
      }
    }
    
    loadDecks();
  }, [])

  const handleDelete = async (deckId: string) => {
    await deckServices.deleteDeck(deckId);
    
    try {
      const decks = await deckServices.getDecks();
      setDecks(decks);
      setMessageText("Deck was deleted");
    }
    catch {
      setDecks([]);
      setMessageText("Deck was NOT deleted");
    }
  }

  const setMessageText = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 5000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {message && <h1>{message}</h1>}
      </div>
      <div className={styles.content}>
        {
          decks ? decks.map((deck, index) => (
            <div key={index} className={styles.deck}>
              <div className={styles.header}>
                <div className={styles.headerContainer}>
                  <p>{deck.name}</p>
                </div>
                <Button 
                  onClick={() => handleDelete(deck._id)}
                  text="Delete"
                  category="red"
                />
              </div>
              <div className={styles.actions}>
                <Button 
                  onClick={() => navigate(generatePath(routesConfig.learn.path, { id: deck._id}))}
                  text="Learn"
                  category="blue"
                />
                <Button 
                  onClick={() => navigate(generatePath(routesConfig.editDeck.path, { id: deck._id}))}
                  text="Edit"
                  category="blue"
                />
              </div>
            </div>
          ))
          : <></>
        }
      </div>
    </div>
  )
}

export default DeckList
