/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/single.css";
// import ShowAlert, { showSignupAlert } from "./alerts";

function Star({ type, gameId, refreshLink }) {
  const { value } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState(null);
  let [starActive, setStarActive] = useState(false);
  const navigate = useNavigate();

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
      alert("You need to Sign Up before you can Favorite a Game");
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
