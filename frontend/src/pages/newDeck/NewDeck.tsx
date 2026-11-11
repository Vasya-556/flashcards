import styles from "./NewDeck.module.css";
import { deckServices } from "../../services";
import { useState } from "react";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../configs";
import Input from "../../components/input/Input";

function NewDeck() {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleCreateDeck = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    try {
      await deckServices.createDeck(name);
      navigate(routesConfig.home.path);
    }
    catch {
      setMessageText("Deck was NOT created");
    }
  }

  const setMessageText = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 5000);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateDeck}>
        <Input 
          label="Deck name" 
          category="default"
          value={name}
          labelProps={{
            htmlFor: "deckName"
          }}
          id="deckName"
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          category="green"
          text="Create deck"
        />
      </form>
      {message && <h1>{message}</h1>}
    </div>
  )
}

export default NewDeck
