/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/single.css";
// import ShowAlert, { showSignupAlert } from "./alerts";

function Star({ gameId }) {
  const [animate, setAnimate] = useState(false);

  let [starActive, setStarActive] = useState(false);

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

  useEffect(() => {
    if (!gameId) return;

    getExistingFavoriteBool(uid.uid, gameId).then((isFavorite) => {
      setStarActive(isFavorite);
    });
  }, [gameId]);

  function favoriteClick() {
    if (localStorage.getItem("CurrLogged")) {
      //StarAnim
      setAnimate(true);
      setTimeout(() => setAnimate(false), 200);

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
      alert("You need to Log In before you can Favorite a Game");
    }
  }
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
