import styles from "./EditDeck.module.css";
import { 
  useParams,
  generatePath,
  useNavigate,
 } from "react-router-dom";
import { 
  deckServices,
  cardServices,
 } from "../../services";
import { 
  useState,
  useEffect,
  useRef,
 } from "react";
import { routesConfig } from "../../configs";
import EditCard from "../../components/editCard/EditCard";
import NewCard from "../../components/newCard/NewCard";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

function EditDeck() {
  const params = useParams();
  const deckId = String(params.id);
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>("");
  const [cards, setCards] = useState<{_id: string, front: string, back: string, alwaysShowFront: boolean, progress: number}[]| null>(null);
  const [editCard, setEditCard] = useState<string[]>([]);
  const [reload, setReload] = useState(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const setMessageText = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 5000);
  }

  const handleUpdateDeck = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    try {
      await deckServices.updateDeck(deckId, name);
      setMessageText("Deck name was updated");
    }
    catch {
      setMessageText("Deck name was NOT updated");
    }
  };

  const handleDeleteDeck = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    try {
      await deckServices.deleteDeck(deckId);
      setMessageText("Deck name was updated");
      navigate(routesConfig.home.path);
    }
    catch {
      setMessageText("Deck name was NOT deleted");
    }
  };

  const handleDeleteCard = async (cardId: string, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    try {
      await cardServices.deleteCard(deckId, cardId);
      setReload(current => !current);
      setMessageText("Card was deleted");
    }
    catch {
      setMessageText("Card was NOT deleted");
    }
  };

  const toggleEditCard = (cardId: string) => {
    setEditCard(
      current => 
      current.includes(cardId)
        ? current.filter(id => id !== cardId)
        : [...current, cardId]
    )
  }

  const handleCreateCard = () => {
    try {
      formRef.current?.requestSubmit();
      setMessageText("Card was created");
    }
    catch {
      setMessageText("Card was NOT created");
    }
  }

  const handleEditCard = (cardId: string, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    try {
      setReload(current => !current);
      toggleEditCard(cardId);
      setMessageText("Card was created");
    }
    catch {
      setMessageText("Card was NOT created");
    }
  }

  useEffect(() => {
    const loadDeckName = async () => {
      try{
        const deck = await deckServices.getDeck(deckId);
        setName(deck.name);
      }
      catch{
        setName("Error");
      }
    };
    
    const loadCards = async () => {
      try{
        const cards = await cardServices.getCards(deckId);
        setCards(cards);
      }
      catch {
        setCards([]);
      }
    };

    loadCards();
    loadDeckName();
  }, [reload, deckId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.deckControlls}>
          <Input
            label="Deck name"
            category="default"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            onClick={handleUpdateDeck}
            category="blue"
            text="Update deck"
          />
          <Button
            onClick={handleDeleteDeck}
            category="red"
            text="Delete deck"
          />
        </div>
        <div className={styles.cardControlls}>
          <NewCard 
            deckId={String(deckId)}
            onCardCreate={() => setReload(current => !current)}
            formRef={formRef} 
          />
          <div className={styles.cardControllsContainer}>
            <Button
              onClick={handleCreateCard}
              category="green"
              text="Create card"
            />
            <Button
              onClick={() => navigate(generatePath(routesConfig.learn.path, { id: deckId}))}
              category="blue"
              text="Learn"
            />
          </div>
        </div>
      </div>
      {message && <h1>{message}</h1>}
      <div className={styles.cards}>
        {
          cards && cards.length > 0 ? cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardInfo}>
                <span>Front: {card.front}</span>
                <span>Back: {card.back}</span>
                <div>
                  <span>Always show front first: </span>
                  {
                    card.alwaysShowFront
                    ? <span>true</span>
                    : <span>false</span>
                  }
                </div>
              </div>
              {
                editCard.includes(card._id)
                ? 
                <>
                  <EditCard 
                    deckId={deckId} 
                    cardId={card._id} 
                    onCardEdit={() => handleEditCard(card._id)}
                    initialFront={card.front}
                    initialBack={card.back}
                    initialAlwaysShowFront={card.alwaysShowFront}
                  />
                </>
                : <></>
              }
              <div className={styles.cardActions}>
                <Button
                  onClick={() => toggleEditCard(card._id)}
                  category="blue"
                  text="Edit"
                />
                <Button
                  onClick={() => handleDeleteCard(card._id)}
                  category="red"
                  text="Delete card"
                />
              </div>
            </div>
          ))
          : <>
          <h1>No cards available</h1>
          </>
        }
      </div>
    </div>
  )
}

export default EditDeck
