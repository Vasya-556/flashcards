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
    }
    catch {
      setDecks([]);
    }
  }

  return (
    <div className={styles.container}>
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
  )
}

export default DeckList
