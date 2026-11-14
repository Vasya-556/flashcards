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
const ProtectedRoute = lazy(() => import("./components/protectedRoute/ProtectedRoute"));

function App() {
  const setAuth = useAuth((state) => state.setAuth);
  const setIsAuthChecked = useAuth((state) => state.setIsAuthChecked);
  const auth = useAuth();

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
      finally {
        setIsAuthChecked(true);
      }
    }
    
    setUser();
  }, [setAuth, setIsAuthChecked])

  return <div>
    <HashRouter>
      <Suspense
      fallback={<LoadingFallback/>}>
        <Header/>
      </Suspense>
      <main>
        <Suspense
          fallback={<LoadingFallback/>}>
          <Routes>
            {
              Object.values(routesConfig).map(({path, element, isProtected}, index) => (
                isProtected
                ?
                <Route 
                  key={index}
                  element={
                    auth.isAuthChecked
                    ? <ProtectedRoute/>
                    : <LoadingFallback/>
                  }>
                  <Route
                    path={path}
                    element={element}
                  />
                </Route>
                : 
                <Route
                  key={index}
                  path={path}
                  element={element}
                />
              ))
            }
          </Routes>
        </Suspense>
      </main>
    </HashRouter>
  </div>;
}

export default App;
