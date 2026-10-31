import styles from "./EditCard.module.css";
import { useState } from "react";
import { cardTypes } from "../../types";
import { cardServices } from "../../services";

type EditCardProps = {
  deckId: string;
  cardId: string;
  onCardEdit: () => void;
}

function EditCard({deckId, cardId, onCardEdit}: EditCardProps) {
  const [editFront, setEditFront] = useState<string>("");
  const [editBack, setEditBack] = useState<string>("");
  const [editAlwaysShowFront, setEditAlwaysShowFront] = useState<boolean>(false);

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
    setEditFront("");
    setEditBack("");
    setEditAlwaysShowFront(false);
    onCardEdit();
  }

  return (
    <div className={styles.container}>
      <form onSubmit={() => handleEditCard(cardId)}>
        <input placeholder="front" value={editFront} onChange={(e) => setEditFront(e.target.value)}></input>
        <input placeholder="back" value={editBack} onChange={(e) => setEditBack(e.target.value)}></input>
        <input placeholder="always show front" type="checkbox" checked={editAlwaysShowFront} onChange={(e) => setEditAlwaysShowFront(e.target.checked)}></input>
        <button>Save</button>
      </form>
    </div>
  )
}

export default EditCard
