import React from "react";
import { DataArray, getDataLength } from "../../DataArray.jsx";
import "../css/random.css"

function RandomGame() {
  const getRandomGame = () => {
    const fetchNewGame = (appid) => {
      return fetch(
        `http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=${appid}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (json[appid] && json[appid].success === true) {
            localStorage.setItem(
              "Single game",
              JSON.stringify(json[appid].data)
            );
            console.log("Found a game");
            return appid;
          } else {
            console.error("Game data not found for ID: " + appid);
            return null;
          }
        })
        .then(() => {
          //window.location.href = "/game/idx";
        })
        .catch((error) => {
          console.error("Error fetching game data:", error);
        });
    };
    DataArray().then((data) => {
      let foundGame = null;
      const findGame = () => {
        const randomGameIndex = Math.floor(Math.random() * data.length);
        const gameId = data[randomGameIndex].appid;
        fetchNewGame(gameId)
          .then((result) => {
            foundGame = result;
            if (foundGame !== null) {
              window.location.href = `/game/idx/`;
            } else {
              // If the game was not found, retry.
              findGame();
            }
          })
          .catch((error) => {
            console.error("Error fetching game data:", error);
          });
      };
      findGame();
    });
  };
  return (
    <button onClick={getRandomGame}     class="button"  >
      Generate
    </button>
  );
}

export default RandomGame;
