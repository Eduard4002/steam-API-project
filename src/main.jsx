import React from "react";
import ReactDOM from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router-dom";
import App from "./App.jsx";
import Default from "./assets/components/Default.jsx";
import Footer from "./assets/components/footer.jsx";
import Header from "./assets/components/header.jsx";
import "./index.css";
import { Games } from "./routes/Games.jsx";

const Wrapper = () => (
  <>
    <Header />
    <Default />
    <Outlet />
    <Footer />
  </>
);
const Test = () => {
  let { gameId } = useParams();

  return (
    <>
      <h1>Game: {gameId}</h1>
      <Link to={"/"}>hehe</Link>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Wrapper />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "game/:gameId",
        element: <Test />,
      },
    ],
  },
  {
    path: "games",
    element: <Games />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
