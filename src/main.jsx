import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./context/authContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Backlog from "./pages/Backlog.jsx";
import Members from "./pages/Members.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Memo from "./pages/Memo.jsx";
import Tags from "./pages/Tags.jsx";

const router = createBrowserRouter([
  {
    name: "Home",
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Projects /> },
      { path: "/history", element: <Backlog /> },
      { path: "/members", element: <Members /> },
      { path: "/task", element: <Memo /> },
      { path: "/tags", element: <Tags /> },
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
