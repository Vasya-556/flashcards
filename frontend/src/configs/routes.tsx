import {
  Home,
  Learn,
  SignIn,
  SignUp,
  Login,
  NotFound,
} from "../pages";

const routesConfig = {
  home: { path: "/", element: <Home/>},
  signin: { path: "/signin", element: <SignIn/>},
  signup: { path: "/signup", element: <SignUp/>},
  login: { path: "/login", element: <Login/>},
  learn: { path: "/learn/:id", element: <Learn/>}, // for learning 
  deck: { path: "/deck/:id", element: <></>}, // for editing
  new: { path: "/new", element: <></>}, // to create new deck
  notFound: { path: "*", element: <NotFound/>}, // 404 not found
};

export {
  routesConfig
}