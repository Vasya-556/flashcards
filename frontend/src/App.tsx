import { useEffect, useState } from "react";
import { fetchAPI } from "./api/api";
import "./App.css";

function App() {
  const [health, setHealth] = useState("not ok");

  useEffect(() => {
    fetchAPI({ url: "/health", method: "get" })
      .then(() => setHealth("ok"))
      .catch(() => setHealth("not ok"));
  }, []);

  return <p>{health}</p>;
}

export default App;
