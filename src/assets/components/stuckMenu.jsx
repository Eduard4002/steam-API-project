import { Link } from "react-router-dom";
import { DataArray, getDataLength } from "../../DataArray.jsx";
import React from "react";
import "../css/sidebar.css";
export default function stuckMenu() {
  //window.location.href("/game/" + data[randomGameIndex].appid);

  const getRandomGame = () => {
    const fetchNewGame = (appid) => {
      return fetch(
        `http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=${appid}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (json[appid]) {
            localStorage.setItem(
              "Single game",
              JSON.stringify(json[appid].data)
            );
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
    <div className="default-container" id="bitch">
      <ul>
        <Link to={"/"} className="link">
          Main Page
        </Link>
        <Link to={"/games"} className="link">
          Games
        </Link>
        <button onClick={getRandomGame}>Random</button>

        <Link to={"/about"} className="link">
          About
        </Link>
      </ul>
    </div>
  );
}
