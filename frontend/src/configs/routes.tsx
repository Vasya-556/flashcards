/* eslint-disable */
import { lazy } from "react";

const Home = lazy(() => import("../pages/home/Home"));
const Learn = lazy(() => import("../pages/learn/Learn"));
const Login = lazy(() => import("../pages/login/Login"));
const NewDeck = lazy(() => import("../pages/newDeck/NewDeck"));
const EditDeck = lazy(() => import("../pages/editDeck/EditDeck"));
const NotFound = lazy(() => import("../pages/notFound/NotFound"));

const routesConfig = {
  home: { path: "/", element: <Home/>},
  login: { path: "/login", element: <Login/>},
  learn: { path: "/learn/:id", element: <Learn/>},
  editDeck: { path: "/deck/:id", element: <EditDeck/>},
  newDeck: { path: "/newDeck", element: <NewDeck/>},
  notFound: { path: "*", element: <NotFound/>},
};

export {
  routesConfig
}