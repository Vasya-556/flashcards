import styles from "./EditCard.module.css";
import { useState } from "react";
import { cardTypes } from "../../types";
import { cardServices } from "../../services";
import Button from "../button/Button";
import Input from "../input/Input";

type EditCardProps = {
  deckId: string;
  cardId: string;
  onCardEdit: () => void;
  initialFront: string;
  initialBack: string;
  initialAlwaysShowFront: boolean;
}

function EditCard({deckId, cardId, onCardEdit, initialFront, initialBack, initialAlwaysShowFront}: EditCardProps) {
  const [editFront, setEditFront] = useState<string>(initialFront);
  const [editBack, setEditBack] = useState<string>(initialBack);
  const [editAlwaysShowFront, setEditAlwaysShowFront] = useState<boolean>(initialAlwaysShowFront);

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
        <div className={styles.fields}>
          {/* <input placeholder="front" value={editFront} onChange={(e) => setEditFront(e.target.value)}></input> */}
          {/* <input placeholder="back" value={editBack} onChange={(e) => setEditBack(e.target.value)}></input> */}
          <Input 
            label="Front" 
            category="default"
            value={editFront}
            onChange={(e) => setEditFront(e.target.value)}
          />
          <Input 
            label="Back"
            category="default"
            value={editBack}
            onChange={(e) => setEditBack(e.target.value)}
          />
          <Input 
            label="Show front first" 
            category="checkbox"
            labelProps={{
              htmlFor: `alwaysShowFront-${cardId}`
            }}
            id={`alwaysShowFront-${cardId}`}
            checked={editAlwaysShowFront}
            onChange={(e) => setEditAlwaysShowFront(e.target.checked)}
          /> 
        </div>
        <Button
          text="Save"
          category="green"
        />
      </form>
    </div>
  )
}

export default EditCard
