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
import Filter from "./assets/components/Filter.jsx";
import "./assets/css/random.css";
import "./assets/css/filter.css";

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
  const [sortedData, setSortedData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  //Fetch the required information
  useEffect(() => {
    if (info.length > 0) return;
    console.log("Fetching information from API");
    DataArray().then((result) => {
      const filteredData = result.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });

      if (filteredData.length === 0) {
        setIsLoading(false);
        return;
      }
      console.log("Filtered");
      console.log(filteredData);
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
              if (json && json[item.appid].success) {
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
        console.log("Temp arr");
        console.log(temp);
        const sortedInfo = filteredData
          .map((item) => temp[item.appid] || null)
          .filter(Boolean)
          .sort((a, b) => {
            const typeOrder = {
              game: 0,
              dlc: 1,
              demo: 2,
              music: 3,
              episode: 4,
            };
            return typeOrder[a.type] - typeOrder[b.type];
          });

        setInfo(sortedInfo);
        setIsLoading(false);
      });
    });
  }, [isLoading]);
  if (isLoading) return <h1>Loading...</h1>;
  console.log("Info");
  console.log(info);

  const handleFilteredData = (data) => {
    setSortedData(data);
  };
  if (info.length === 0) {
    return <h1>There does not appear to be any result</h1>;
  } else {
    return (
      <>
        <h1>There are {info.length} results</h1>
        <div className="parent">
        <Filter initialData={info} onFilteredData={handleFilteredData} />

        <div className="games-parent">
        {sortedData.length === 0 ? (
            <h1>There are no games currently with this filter</h1>
          ) : (
            <ListGames dataToDisplay={sortedData} gamesPerPage={10} />
          )}
        </div>
        </div>
      </>
    );
  }
};

const SetGames = () => {
  const cached = localStorage.getItem("DATA");
  let data;
  if (cached) {
    data = JSON.parse(cached);
  } else {
    window.location.href = "/";
  }

  /*
  const [sortBy, setSortBy] = useState("default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50); // Set your initial max price value
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([
    "game",
    "dlc",
    "music",
    "demo",
  ]);
  const [openFilter, setOpenFilter] = useState(false);
  useEffect(() => {
    const cachedFilter = localStorage.getItem("Filter");
    if (cachedFilter) {
      const filter = JSON.parse(cachedFilter);
      setSortBy(filter[0].sortBy);
      setSelectedTypes(filter[0].selectedTypes);
      setMinPrice(filter[0].minPrice);
      setMaxPrice(filter[0].maxPrice);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isLoading]);
  if (isLoading) return;
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
  // Filter data based on custom price range
  const customFilteredData = filteredData.filter((item) => {
    //Only return items that do not have the price_overview property
    if (sortBy === "price-free") {
      return !item.price_overview;
    }
    //If we are not using the custom prices then return all games
    if (sortBy !== "price-custom") return true;
    if (item.price_overview) {
      const price = item.price_overview.final;
      return price >= minPrice * 100 && price <= maxPrice * 100;
    }
    // Handle the case where price_overview doesn't exist or is not an object
    if (minPrice === 0 || minPrice === NaN) {
      return true; // Include the item if minPrice is 0
    } else {
      return false; // Exclude the item if price information is missing
    }
  });
  const sortedData = sortGames(customFilteredData, sortBy);

  const filterArr = [
    {
      sortBy: sortBy,
      selectedTypes: selectedTypes,
      minPrice: minPrice,
      maxPrice: maxPrice,
    },
  ];
  localStorage.setItem("Filter", JSON.stringify(filterArr));

  */
  //const sortedData2 = Filter({ initialData: data });
  const [sortedData, setSortedData] = useState(data);
  const [openFilter, setOpenFilter] = useState(false);

  const handleFilteredData = (data) => {
    setSortedData(data);
  };
  const changeFilterState = () => {
    console.log("Clicked...");
    setOpenFilter(!openFilter);
  };

  return (
    <>
      <div className={`filterButton`} onClick={changeFilterState}>
        <span className="filterIcon material-symbols-outlined">
          {openFilter ? "close" : "tune"}
        </span>
      </div>
      <div className="parent">
        <Filter initialData={data} onFilteredData={handleFilteredData} />
        <div className="games-parent">
          {sortedData.length === 0 ? (
            <h1>There are no games currently with this filter</h1>
          ) : (
            <ListGames dataToDisplay={sortedData} gamesPerPage={5} />
          )}
        </div>
        <div className="empty-parent"></div>
      </div>

      <div className="randomDiv">
        <h2>Still can't find a game you want?</h2>
        <h2>Find a random game here!</h2>
        <RandomGame />
      </div>
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
