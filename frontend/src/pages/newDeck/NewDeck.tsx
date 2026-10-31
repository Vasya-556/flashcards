import styles from "./NewDeck.module.css";
import { deckServices } from "../../services";
import { useState } from "react";

function NewDeck() {
  const [name, setName] = useState<string>("");

  const handleCreateDeck = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    await deckServices.createDeck(name);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateDeck}>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <button>Create deck</button>
      </form>
    </div>
  )
}

export default NewDeck
