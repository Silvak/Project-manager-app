import React, { Children } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Backlog from "./pages/Backlog.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    name: "Home",
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Projects /> },
      { path: "/backlog", element: <Backlog /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
