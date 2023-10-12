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

  const [sortBy, setSortBy] = useState("default");
  const [selectedTypes, setSelectedTypes] = useState([
    "game",
    "dlc",
    "music",
    "demo",
  ]);

  const sortGames = (data, sortBy) => {
    const [field, order] = sortBy.split("-");
    if (field === "default") return data;

    if (field === "name") {
      return [...data].sort((a, b) => {
        if (order === "asc") {
          return a["name"].localeCompare(b["name"]);
        } else if (order === "desc") {
          return b["name"].localeCompare(a["name"]);
        }
      });
    } else if (field === "price") {
      return [...data].sort((a, b) => {
        const priceA = a["price_overview"] ? a["price_overview"]["final"] : 0;
        const priceB = b["price_overview"] ? b["price_overview"]["final"] : 0;
        if (order === "asc") {
          return priceA - priceB;
        } else if (order === "desc") {
          return priceB - priceA;
        }
      });
    }

    return [];
  };
  const filteredData = data.filter((item) => selectedTypes.includes(item.type));
  const sortedData = sortGames(filteredData, sortBy);
  console.log(sortedData);
  /*
  // Update the displayed data when the selected types or sorting method change
  useEffect(() => {
    const filteredData = data.filter((item) =>
      selectedTypes.includes(item.type)
    );
    const sortedData = sortGames(filteredData, sortBy);
    setSortedData(sortedData);
  }, [selectedTypes, sortBy]);*/

  return (
    <>
      <div>
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
          <option value="price-asc">Price: Least Expensive</option>
          <option value="price-desc">Price: Most Expensive</option>
          {/* Add more sorting options here */}
        </select>
      </div>
      <div>
        <label>Filter by Type:</label>
        {["game", "dlc", "music", "demo"].map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTypes([...selectedTypes, type]);
                } else {
                  setSelectedTypes(selectedTypes.filter((t) => t !== type));
                }
              }}
            />
            {type}
          </label>
        ))}
      </div>
      {sortedData.length === 0 ? (
        <h1>There are no games currently with this filter</h1>
      ) : (
        <ListGames dataToDisplay={sortedData} gamesPerPage={5} />
      )}
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
