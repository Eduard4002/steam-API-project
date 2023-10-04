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
import Singlegame from "./SingleGame.jsx";
import Default from "./assets/components/Default.jsx";
import ListGames from "./assets/components/ListGames.jsx";
import Footer from "./assets/components/footer.jsx";
import Header from "./assets/components/header.jsx";
import "./index.css";
import LogIn from "./logInPage.jsx";
import Profile from "./profile.jsx";
import Favorites from "./favorites.jsx";
import SignUp from "./signUpPage.jsx";
import { DataArray, getRandomGames } from "./DataArray.jsx";
import theme_music from "./assets/theme.mp3";
// import DarkMode from "./assets/components/DarkMode.jsx"

window.addEventListener("click", () => {
  let music = new Audio(theme_music); // Create an Audio element
  music.loop = true; // Set the loop property to true
  music.play(); // Call play() on the Audio element
  console.log("Should be playing Theme song...");
});

const Wrapper = () => (
  <>
    {/* <DarkMode/> */}
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
const SearchBar = () => {
  let { value } = useParams();
  //Filter array with search value
  const data = DataArray();
  if (data.length === 0) return <h1>Loading</h1>;

  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(value.toLowerCase());
  });

  console.log("Search value is " + value);
  console.log(filteredData);
  if (filteredData.length === 0) {
    return <h1>There does not appear to be any result</h1>;
  } else {
    return (
      <ListGames dataToDisplay={filteredData} maxGames={20} gamesPerPage={10} />
    );
  }
};

const SetGames = () => {
  const data = getRandomGames(20);
  if (data.length === 0) return <h1>Loading</h1>;
  return <ListGames dataToDisplay={data} />;
};
const router = createBrowserRouter([
  {
    element: <Wrapper />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/game/:gameId",
        element: <Singlegame />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/games",
        element: <SetGames />,
      },
      {
        path: "/result/:value",
        element: <SearchBar />,
      },
      // {
      //   path: "/singlegame",
      //   element: <Singlegame />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
