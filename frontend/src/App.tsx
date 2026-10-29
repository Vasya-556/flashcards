import "./App.css";
import { 
  HashRouter,
  Routes,
  Route
 } from "react-router-dom";
import { Header } from "./components";
import { routesConfig } from "./configs";
import { useAuth } from "./hooks";
import { useEffect } from "react";
import { authServices } from "./services";

function App() {
  const auth = useAuth();

  const setUser = async() => {
    try {
      const user = await authServices.me();
      if (user !== null) {
        auth.setAuth(user);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setUser();
  }, [])

  return <div>
    <HashRouter>
      <Header/>
      <Routes>
        {
          Object.values(routesConfig).map(({path, element}, index) => (
            <Route
              key={index}
              path={path}
              element={element}
            />
          ))
        }
      </Routes>
    </HashRouter>
  </div>;
}

export default App;
