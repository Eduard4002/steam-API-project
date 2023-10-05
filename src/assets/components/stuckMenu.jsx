import { Link } from "react-router-dom";
import { getDataLength } from "../../DataArray.jsx";
import React from "react";
import "../css/sidebar.css";
export default function stuckMenu() {
  const randomGameIndex = Math.floor(Math.random() * getDataLength());
  //window.location.href("/game/" + data[randomGameIndex].appid);

  return (
    <div className="default-container">
      <ul>
        <Link to={"/"} className="link">
          Main Page
        </Link>
        <Link to={"/games"} className="link">
          Games
        </Link>

        <Link to={"/"} className="link">
          Something
        </Link>
        <Link to={"/game/idx/" + randomGameIndex} className="link">
          Random
        </Link>
      </ul>
    </div>
  );
}
