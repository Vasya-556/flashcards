const routesConfig = {
  home: { path: "/", element: <></>},
  signin: { path: "/signin", element: <></>},
  signup: { path: "/signup", element: <></>},
  deck: { path: "/deck/:id", element: <></>}, // for editing
  learn: { path: "/learn/:id", element: <></>}, // for learning 
  new: { path: "/new", element: <></>}, // to create new deck
  notFound: { path: "*", element: <p>404</p>}, // 404 not found
}

export {
  routesConfig
}