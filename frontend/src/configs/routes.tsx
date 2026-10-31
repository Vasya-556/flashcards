import {
  Home,
  Learn,
  SignIn,
  SignUp,
  Login,
  NewDeck,
  EditDeck,
  NotFound,
} from "../pages";

const routesConfig = {
  home: { path: "/", element: <Home/>},
  signin: { path: "/signin", element: <SignIn/>},
  signup: { path: "/signup", element: <SignUp/>},
  login: { path: "/login", element: <Login/>},
  learn: { path: "/learn/:id", element: <Learn/>},
  editDeck: { path: "/deck/:id", element: <EditDeck/>},
  newDeck: { path: "/newDeck", element: <NewDeck/>},
  notFound: { path: "*", element: <NotFound/>},
};

export {
  routesConfig
}