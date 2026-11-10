import { 
  useState,
  useEffect,
 } from "react";
import styles from "./Learn.module.css";
import { 
  cardServices,
 } from "../../services";
import { 
  useParams,
  generatePath,
  useNavigate,
 } from "react-router-dom";
import { routesConfig } from "../../configs";
import Button from "../../components/button/Button";

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
  const [flipped, setFlipped] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const deckId = String(params.id);

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
    const loadCards = async () => {
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
    };

    loadCards();
  }, [deckId, reload]);

  const handleFlip = () => {
    const isShowingFront = !flipped ? true : showFront;

    setFlipped(true);
    setShowFront(!isShowingFront);
  }

  return (
    <div className={styles.container}>
      <Button
        onClick={() => navigate(generatePath(routesConfig.editDeck.path, { id: deckId}))}
        category="blue"
        text="Edit deck"
      />
      {
        cards && cards.length > 0
        ? <div className={styles.card}>
          <Button
            onClick={() => handleIncorrect(cards[0]._id)}
            category="red"
            text="Incorrect"
          />
          <div onClick={handleFlip} className={styles.cardText}>
            {
              !flipped
              ? (
                cards[0].alwaysShowFront || showFront
                ? <pre>{cards[0].front}</pre>
                : showFront
                  ? <pre>{cards[0].front}</pre>
                  : <pre>{cards[0].back}</pre>
              )
              : (
                showFront
                  ? <pre>{cards[0].front}</pre>
                  : <pre>{cards[0].back}</pre>
              )
            }
          </div>
          <Button
            onClick={() => handleCorrect(cards[0]._id)}
            category="green"
            text="Correct"
          />
        </div>
        : <div className={styles.noCards}>
          <h1>No cards available</h1>
          <Button
            onClick={() => navigate(-1)}
            category="blue"
            text="Back"
          />
          {
            hasStartedLearning 
            ? <Button
                onClick={() => setReload(current => !current)}
                category="blue"
                text="Try again"
              />
            : <></>
          }
        </div>
      }
    </div>
  )
}

export default Learn
