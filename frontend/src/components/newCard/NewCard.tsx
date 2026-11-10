import styles from "./NewCard.module.css";
import { cardServices } from "../../services";
import { cardTypes } from "../../types";
import { useState } from "react";
import Input from "../input/Input";

type NewCardProps = {
  deckId: string;
  onCardCreate: () => void;
  formRef: React.Ref<HTMLFormElement>;
}

function NewCard({deckId, onCardCreate, formRef}: NewCardProps) {
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
      <form 
        onSubmit={handleCreateCard}
        ref={formRef}
        >
        <div className={styles.fields}>
          <Input 
            label="Front" 
            category="default"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
          <Input 
            label="Back"
            category="default"
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
          <Input 
            label="Show front first" 
            category="checkbox"
            labelProps={{
              htmlFor: "alwaysShowFront"
            }}
            id="alwaysShowFront"
            checked={alwaysShowFront}
            onChange={(e) => setAlwaysShowFront(e.target.checked)}
          /> 
        </div>
      </form>
    </div>
  )
}

export default NewCard
