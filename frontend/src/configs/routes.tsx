/* eslint-disable */
import { lazy } from "react";

const Home = lazy(() => import("../pages/home/Home"));
const Learn = lazy(() => import("../pages/learn/Learn"));
const Login = lazy(() => import("../pages/login/Login"));
const NewDeck = lazy(() => import("../pages/newDeck/NewDeck"));
const EditDeck = lazy(() => import("../pages/editDeck/EditDeck"));
const NotFound = lazy(() => import("../pages/notFound/NotFound"));

const routesConfig = {
  home: { path: "/", element: <Home/>, isProtected: false },
  login: { path: "/login", element: <Login/>, isProtected: false },
  learn: { path: "/learn/:id", element: <Learn/>, isProtected: true },
  editDeck: { path: "/deck/:id", element: <EditDeck/>, isProtected: true },
  newDeck: { path: "/newDeck", element: <NewDeck/>, isProtected: true },
  notFound: { path: "*", element: <NotFound/>, isProtected: false },
};

export {
  routesConfig
}