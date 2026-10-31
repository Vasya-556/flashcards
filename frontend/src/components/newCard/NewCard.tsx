import styles from "./NewCard.module.css";
import { cardServices } from "../../services";
import { cardTypes } from "../../types";
import { useState } from "react";

type NewCardProps = {
  deckId: string;
  onCardCreate: () => void;
}

function NewCard({deckId, onCardCreate}: NewCardProps) {
  const [front, setFront] = useState<string>("");
  const [back, setBack] = useState<string>("");
  const [alwaysShowFront, setAlwaysShowFront] = useState<boolean>(false);

  const handleCreateCard = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    
    const data: cardTypes.CardInput = {
      front: front,
      back: back,
      alwaysShowFront: alwaysShowFront
    }
    await cardServices.createCard(deckId, data);
    setFront("");
    setBack("");
    setAlwaysShowFront(false);
    onCardCreate();
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateCard}>
        <input value={front} placeholder="front" onChange={(e) => setFront(e.target.value)}></input>
        <input value={back} placeholder="back" onChange={(e) => setBack(e.target.value)}></input>
        <label>Always show front</label>
        <input checked={alwaysShowFront} placeholder="always show front?" type="checkbox" onChange={(e) => setAlwaysShowFront(e.target.checked)}></input>
        <button>Create card</button>
      </form>
    </div>
  )
}

export default NewCard
