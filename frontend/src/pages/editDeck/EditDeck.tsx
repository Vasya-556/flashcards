import styles from "./EditDeck.module.css";
import { 
  useParams,
  generatePath,
  Link,
 } from "react-router-dom";
import { 
  deckServices,
  cardServices,
 } from "../../services";
import { 
  useState,
  useEffect,
 } from "react";
import { routesConfig } from "../../configs";
import { EditCard, NewCard } from "../../components";

function EditDeck() {
  const params = useParams();
  const deckId = String(params.id);
  const [name, setName] = useState<string>("");
  const [cards, setCards] = useState<{_id: string, front: string, back: string, alwaysShowFront: boolean, progress: number}[]| null>(null);
  const [editCard, setEditCard] = useState<boolean>(false);

  const handleUpdateDeck = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    await deckServices.updateDeck(deckId, name);
  };

  const handleDeleteDeck = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    await deckServices.deleteDeck(deckId);
  };

  const handleDeleteCard = async (cardId: string, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    await cardServices.deleteCard(deckId, cardId);
    loadCards()
  };

  const loadCards = async () => {    
    const cards = await cardServices.getCards(deckId);
    setCards(cards);
  };

  const loadDeck = async () => {
    const deck = await deckServices.getDeck(deckId);
    setName(deck.name);
  };

  useEffect(() => {
    loadCards();
    loadDeck();
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={handleUpdateDeck}>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <button>Update deck</button>
      </form>
      <form onSubmit={handleDeleteDeck}>
        <button>Delete deck</button>
      </form>
      <NewCard deckId={String(deckId)} onCardCreate={loadCards}/>
      <Link to={generatePath(routesConfig.learn.path, { id: deckId})}>Learn</Link>
      {
        cards ? cards.map((card, index) => (
          <div key={index}>
            <p>{card.front}</p>
            <p>{card.back}</p>
            {
              card.alwaysShowFront
              ? <p>true</p>
              : <p>false</p>
            }
            <button onClick={() => setEditCard(!editCard)}>Edit</button>
            {
              editCard
              ? 
              <>
                <EditCard deckId={deckId} cardId={card._id} onCardEdit={() => {
                  loadCards();
                  setEditCard(!editCard)
                }}/>
              </>
              : <></>
            }
            <br/>
            <button onClick={() => handleDeleteCard(card._id)}>Delete card</button>
            <hr/>
          </div>
        ))
        : <></>
      }
    </div>
  )
}

export default EditDeck
