import React, { useEffect, useState } from "react";
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
import ToggleVisibility from "./assets/components/ToggleVisibility.jsx";
import StuckMenu from "./assets/components/stuckMenu.jsx"; // Import your Slideshow component
import About from "./About.jsx";
import RandomGame from "./assets/components/RandomGame.jsx";

// import theme_music from "./assets/theme.mp3";
// import DarkMode from "./assets/components/DarkMode.jsx"

// window.addEventListener("click", () => {
//   let music = new Audio(theme_music); // Create an Audio element
//   music.play(); // Call play() on the Audio element
//   console.log("Should be playing Theme song...");
// });

const Wrapper = () => (
  <>
    {/* <DarkMode/> */}
    <Header />
    <ToggleVisibility>
      <StuckMenu />
    </ToggleVisibility>
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
  const [info, setInfo] = useState([]);
  //Fetch the required information
  useEffect(() => {
    if (info.length > 0) return;
    console.log("Fetching information from API");
    DataArray().then((result) => {
      const filteredData = result.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });

      console.log(filteredData);

      if (filteredData.length === 0) {
        return; //<h1>There does not appear to be any result</h1>;
      }

      // Create a temporary map to associate extra data with games
      const temp = {};

      // Use Promise.all to wait for all fetch calls to complete
      Promise.all(
        filteredData.slice(0, 50).map((item, index) => {
          // Construct the URL for fetching game details
          let url =
            "http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=" +
            item.appid;
          // Perform the fetch request
          return fetch(url)
            .then((response) => response.json())
            .then((json) => {
              // Check if the JSON response contains an image URL
              if (json && json[item.appid].success) {
                // Associate the fetched image URL with its corresponding game
                temp[item.appid] = json[item.appid].data;
              }
            })
            .catch((error) => {
              // Handle errors that occur during the fetch
              console.error(error);
            });
        })
      ).then(() => {
        // Create an array of images based on the displayedGames order
        // Sort the games based on the "type" property
        const sortedInfo = filteredData
          .map((item) => temp[item.appid] || null)
          .filter(Boolean)
          .sort((a, b) => {
            const typeOrder = { game: 0, dlc: 1, music: 2 };
            return typeOrder[a.type] - typeOrder[b.type];
          });

        setInfo(sortedInfo);
        console.log(sortedInfo);
      });
    });
  }, []);
  console.log(info);
  if (info.length === 0) {
    return <h1>There does not appear to be any result</h1>;
  } else {
    return (
      <>
        <h1>There are {info.length} results</h1>
        <ListGames dataToDisplay={info} gamesPerPage={10} />
      </>
    );
  }
};

const SetGames = () => {
  const data = JSON.parse(localStorage.getItem("DATA"));

  const [sortBy, setSortBy] = useState("name-asc"); // Default sorting by name in ascending order

  // Define a sorting function
  const sortGames = (data, sortBy) => {
    const [field, order] = sortBy.split("-");
    if (field === "name") {
      return [...data].sort((a, b) => {
        if (order === "asc") {
          return a[field].localeCompare(b[field]);
        } else if (order === "desc") {
          return b[field].localeCompare(a[field]);
        }
        return 0;
      });
    }
  };

  const sortedData = sortGames(data, sortBy);
  return (
    <>
      <div>
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          {/* Add more sorting options here */}
        </select>
      </div>
      <ListGames dataToDisplay={sortedData} gamesPerPage={5} />
      <div>
        <h2>Still can't find a game you want?</h2>
        <h2>Find a random game here!</h2>
      </div>
      <RandomGame />
    </>
  );
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
        path: "/game/id/:value",
        element: <Singlegame type={"id"} />,
      },
      {
        path: "/game/idx/",
        element: <Singlegame type={"index"} />,
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
        path: "/about",
        element: <About />,
      },
      {
        path: "/result/:value",
        element: <SearchBar />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
