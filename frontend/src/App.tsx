import "./App.css";
import { 
  HashRouter,
  Routes,
  Route
 } from "react-router-dom";
import { routesConfig } from "./configs";
import { useAuth } from "./stores";
import { useEffect } from "react";
import { authServices } from "./services";
import { 
  Suspense,
  lazy,
 } from "react";

const Header = lazy(() => import("./components/header/Header"));
const LoadingFallback = lazy(() => import("./components/loadingFallback/LoadingFallback"));

function App() {
  const setAuth = useAuth((state) => state.setAuth);

  useEffect(() => {
    const setUser = async() => {
      try {
        const user = await authServices.me();
        if (user !== null) {
          setAuth(user);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    
    setUser();
  }, [setAuth])

  return <div>
    <HashRouter>
      <Suspense
      fallback={<LoadingFallback/>}>
        <Header/>
      </Suspense>
      <main>
        <Routes>
          {
            Object.values(routesConfig).map(({path, element}, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense
                    fallback={<LoadingFallback/>}>
                    {element}
                  </Suspense>
                }
              />
            ))
          }
        </Routes>
      </main>
    </HashRouter>
  </div>;
}

export default App;
