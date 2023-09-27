import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Games } from "./routes/Games.jsx";
import Header from "./assets/components/header.jsx";
import Footer from "./assets/components/footer.jsx";
import "./index.css";
import Default from "./assets/components/Default.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useParams,
  Link,
} from "react-router-dom";
import LogIn from "./logInPage.jsx";

const Wrapper = () => (
  <>
    <Header />
    <Default/>
    <App />
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
  {
    path: "src/logInPage.jsx",
    element: <LogIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
