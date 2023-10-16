/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/single.css";

function Star({ type, gameId }) {
  const { value } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState(null);
  let [starActive, setStarActive] = useState(false);
  const navigate = useNavigate()

  let data;

  const uid = {
    uid: localStorage.getItem("CurrLogged"),
  };

  //data = DataArray();

  // Function to check if the game is in the user's favorites
  const checkFavorite = async (userId, gameId) => {
    try {
      const response = await axios.post("http://localhost:3000/checkFavorite", {
        userId,
        gameId,
      });
      setStarActive(response.data.isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  const getExistingFavoriteBool = (uid, gameId) => {
    return axios
      .post("http://localhost:3000/singlegame/is-fav", {
        uid: uid,
        newItem: gameId,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //   useEffect(() => {
  //     if (itemData) return;
  //     const cachedData = localStorage.getItem("Single game");

  //     if (cachedData && cachedData != "" && cachedData != "undefined") {
  //       console.log("Getting information from localstorage");
  //       setItemData(JSON.parse(localStorage.getItem("Single game")));
  //       setLoading(false);
  //     } /*
  //     console.log(JSON.parse(localStorage.getItem("Single game")));
  //     setItemData(JSON.parse(localStorage.getItem("Single game")));
  //     setLoading(false);*/
  //   }, []);

  useEffect(() => {
    if (!gameId) return;

    getExistingFavoriteBool(uid.uid, gameId).then(
      (isFavorite) => {
        console.log(isFavorite);
        setStarActive(isFavorite);
      }
    );
  }, [gameId]);
    
    
  /*
  //const gameId = data[randomIndex].appid;
  useEffect(() => {
    console.log(itemData);
    if (isLoading || type != "index" || itemData) {
      return;
    }
    console.log("Fetching information from API");
    DataArray().then((result) => {
      /*
      let gameId;
      if (type === "id") {
        gameId = value;
      } else {
        gameId = data[value]?.appid;
      }
      gameId = result[value]?.appid;

      console.log("Game id: " + gameId);
      const url = `http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=${gameId}`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setItemData(json[gameId].data);
          localStorage.setItem(
            "Single game",
            JSON.stringify(json[gameId].data)
          );
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
        });
    });
  }, [value, isLoading]);*/

  //itemData = JSON.parse(localStorage.getItem("Single game"));

  //localStorage.setItem("Single game", JSON.stringify(itemData));

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const url = `http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=${gameId}`;
  //         const response = await fetch(url);
  //         const data = await response.json();
  //         setItemData(data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  // console.log(gameId);
  // console.log(isLoading);

  //   if (error) {
  //     return (
  //       <>
  //         <ToggleVisibility>
  //           <StuckMenu /> {/* Use the Slideshow component */}
  //         </ToggleVisibility>

  //         <h1>{`${error}`}</h1>
  //       </>
  //     );
  //   }

  //   if (isLoading || !itemData) {
  //     return (
  //       <>
  //         <ToggleVisibility>
  //           <StuckMenu /> {/* Use the Slideshow component */}
  //         </ToggleVisibility>

  //         <h1>Loading...</h1>
  //       </>
  //     );
  //   }

  //   if (itemData.steam_appid === 0) return <h1>Loading</h1>;

  function favoriteClick() {
    if (localStorage.getItem("CurrLogged")) {
      //StarAnim
      setAnimate(true);
      setTimeout(() => setAnimate(false), 200);

      const newItem = {
        newItem: gameId,
      };

      console.log("check");

      //post Request
      axios
        .post("http://localhost:3000/singlegame", {
          uid: uid.uid,
          newItem: gameId,
        })
        .then((response) => {
          setStarActive(!starActive);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log("CheckFunction run");
    } else {
        navigate("/")
    }
  }

  // Example usage:
  const buttonStyle = {
    width: "30px",
    background: "none",
    border: "0px",
    padding: "0",
  };

  const gameUrl = "https://store.steampowered.com/app/" + itemData?.steam_appid;
  return (
    <>
      <div
        className={`star ${starActive ? "active" : "inactive"} ${
          animate ? "animate" : ""
        }`}
        onClick={favoriteClick}
      ></div>
    </>
  );
}
export default Star;
