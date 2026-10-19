import "./App.css";
import { 
  HashRouter,
  Routes,
  Route
 } from "react-router-dom";
import { Header } from "./components";
import { routesConfig } from "./configs";

function App() {
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
