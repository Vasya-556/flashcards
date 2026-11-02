import { 
  useState,
  useEffect,
  useCallback,
 } from "react";
import styles from "./Learn.module.css";
import { 
  cardServices,
 } from "../../services";
import { 
  useParams,
  Link,
  generatePath,
  useNavigate,
 } from "react-router-dom";
import { routesConfig } from "../../configs";

type Card = {
  _id: string,
  deck: string,
  front: string,
  back: string,
  alwaysShowFront: boolean,
  progress: number,
}

const shuffle = (cards: Card[]) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    
    [cards[i], cards[j]] = [cards[j], cards[i]]
  };
};

function Learn() {
  const [cards, setCards] = useState<Card[]>();
  const [showFront, setShowFront] = useState<boolean>(() => Math.random() > 0.5);
  const [hasStartedLearning, setHasStartedLearning] = useState<boolean>(false);
  const [flipped, setFlipped] = useState<boolean>(false)
  const params = useParams();
  const navigate = useNavigate();
  const deckId = String(params.id);

  const loadCards = useCallback(async () => {
    setHasStartedLearning(false);
    try {
      let cards: Card[] | null = await cardServices.getCards(deckId);
      if (cards === null){
        setCards([]);
        return;
      }
      cards = cards.filter((card) => card.progress < 100)
      shuffle(cards);
      setCards(cards);
    }
    catch {
      setCards([]);
    }
  }, [deckId]);

  const handleCorrect = async (cardId: string) => {
    setHasStartedLearning(true);
    setFlipped(false);

    await cardServices.increaseProgress(deckId, cardId);

    setCards(current => current?.slice(1));
    setShowFront(() => Math.random() > 0.5);
  }

  const handleIncorrect = async (cardId: string) => {
    setFlipped(false);

    await cardServices.decreaseProgress(deckId, cardId);

    setCards(current => {
      if (!current || current.length <= 1){
        return current
      }
      return [...current.slice(1), current[0]];
    });
    setShowFront(() => Math.random() > 0.5);
  }

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const handleFlip = () => {
    setFlipped(true);
    setShowFront(!showFront);
  }

  return (
    <div className={styles.container}>
      <Link to={generatePath(routesConfig.editDeck.path, { id: deckId})}>Edit</Link><br/>
      {
        cards && cards.length > 0
        ? <div>
          {
            cards[0].alwaysShowFront && !flipped
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
        : <div>
          <p>No cards available</p>
          <button onClick={() => navigate(-1)}>Back</button>
          <Link to={generatePath(routesConfig.editDeck.path, { id: deckId})}>Crete cards</Link>
          {
            hasStartedLearning ? <button onClick={() => loadCards()}>Try again</button> : <></>
          }
        </div>
      }
    </div>
  )
}

export default Learn
