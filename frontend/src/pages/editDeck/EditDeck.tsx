import styles from "./EditDeck.module.css";
import { useParams } from "react-router-dom";
import { 
  deckServices,
  cardServices,
 } from "../../services";
import { 
  useState,
  useEffect,
 } from "react";
import { cardTypes } from "../../types";

function EditDeck() {
  const params = useParams();
  const deckId = params.id;
  const [name, setName] = useState<string>("");
  const [cards, setCards] = useState<{_id: string, front: string, back: string, alwaysShowFront: boolean, progress: number}[]| null>(null);
  const [front, setFront] = useState<string>("");
  const [back, setBack] = useState<string>("");
  const [alwaysShowFront, setAlwaysShowFront] = useState<boolean>(false);
  const [editCard, setEditCard] = useState<boolean>(false);
  const [editFront, setEditFront] = useState<string>("");
  const [editBack, setEditBack] = useState<string>("");
  const [editAlwaysShowFront, setEditAlwaysShowFront] = useState<boolean>(false);
  

  const handleUpdateDeck = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    if (typeof deckId !== "string"){
      return
    }

    await deckServices.updateDeck(deckId, name);
  }

  const set = async () => {
    if (typeof deckId !== "string"){
      return
    }
    
    const cards = await cardServices.getCards(deckId);
    setCards(cards);
  }

  useEffect(() => {
    set();
  }, []);

  const handleCreateCard = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    if (typeof deckId !== "string"){
      return
    }
    
    const data: cardTypes.CardInput = {
      front: front,
      back: back,
      alwaysShowFront: alwaysShowFront
    }
    await cardServices.createCard(deckId, data);
    set();
  }

  const handleDeleteDeck = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    if (typeof deckId !== "string"){
      return
    }

    await deckServices.deleteDeck(deckId);
  }

  const handleDeleteCard = async (cardId: string, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    if (typeof deckId !== "string"){
      return
    }

    await cardServices.deleteCard(deckId, cardId);
    set()
  } 
  
  const handleEditCard = async(cardId: string, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    if (typeof deckId !== "string"){
      return
    }

    const data: cardTypes.CardInput = {
      front: editFront,
      back: editBack,
      alwaysShowFront: editAlwaysShowFront
    }

    await cardServices.updateCard(deckId, cardId, data);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleUpdateDeck}>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <button>Update deck</button>
      </form>
      <form onSubmit={handleDeleteDeck}>
        <button>Delete deck</button>
      </form>
      <form onSubmit={handleCreateCard}>
        <input value={front} placeholder="front" onChange={(e) => setFront(e.target.value)}></input>
        <input value={back} placeholder="back" onChange={(e) => setBack(e.target.value)}></input>
        <input checked={alwaysShowFront} placeholder="always show front?" type="checkbox" onChange={(e) => setAlwaysShowFront(e.target.checked)}></input>
        <button>Create card</button>
      </form>
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
              <form onSubmit={() => handleEditCard(card._id)}>
                <input placeholder="front" value={editFront} onChange={(e) => setEditFront(e.target.value)}></input>
                <input placeholder="back" value={editBack} onChange={(e) => setEditBack(e.target.value)}></input>
                <input placeholder="always show front" type="checkbox" checked={editAlwaysShowFront} onChange={(e) => setEditAlwaysShowFront(e.target.checked)}></input>
                <button>Save</button>
              </form>
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
