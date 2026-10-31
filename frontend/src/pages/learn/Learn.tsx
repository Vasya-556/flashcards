import { 
  useState,
  useEffect,
 } from "react";
import styles from "./Learn.module.css";
import { 
  cardServices,
  deckServices
 } from "../../services";
import { useParams } from "react-router-dom";

type Card = {
  _id: string,
  deck: string,
  front: string,
  back: string,
  alwaysShowFront: boolean,
  progress: number,
}

function Learn() {
  const [cards, setCards] = useState<Card[]>();
  const params = useParams();
  const deckId = params.id;
  const [showFront, setShowFront] = useState<boolean>(() => Math.random() > 0.5);

  const set = async () => {
    if (typeof deckId !== "string"){
      return
    }
    let cards2 = await cardServices.getCards(deckId);
    shuffle(cards2)
    setCards(cards2);
  }

  const handleCorrect = async (cardId: string) => {
    if (typeof deckId !== "string"){
      return;
    }
    
    await cardServices.increaseProgress(deckId, cardId);

    setCards(current => current?.slice(1));
    setShowFront(() => Math.random() > 0.5);
  }

  const handleIncorrect = async (cardId: string) => {
    if (typeof deckId !== "string"){
      return;
    }

    await cardServices.decreaseProgress(deckId, cardId);

    setCards(current => {
      if (!current || current.length <= 1){
        return current
      }
      return [...current.slice(1), current[0]];
    });
    setShowFront(() => Math.random() > 0.5);
  }

  const shuffle = (cards: Card[]) => {
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      
      [cards[i], cards[j]] = [cards[j], cards[i]]
    }
  }

  useEffect(() => {
    set();
  }, []);

  const handleFlip = () => {
    setShowFront(!showFront);
  }

  return (
    <div className={styles.container}>
      {
        cards && cards.length > 0
        ? <div>
          {
            cards[0].alwaysShowFront
            ? <p>{cards[0].front}</p>
            : (
              showFront
              ? <p>{cards[0].front}</p>
              : <p>{cards[0].back}</p>
            )
          }
          <button onClick={() => handleCorrect(cards[0]._id)}>correct</button>
          <button onClick={() => handleIncorrect(cards[0]._id)}>incorrect</button>
          <button onClick={handleFlip}>flip</button>
        </div>
        : <p>No cards available</p>
      }
    </div>
  )
}

export default Learn
