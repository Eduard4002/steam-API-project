import { Link } from "react-router-dom";
import React from "react";
import RandomGame from "./RandomGame.jsx";
import "../css/sidebar.css";
export default function stuckMenu() {
  //window.location.href("/game/" + data[randomGameIndex].appid);

  return (
    <div className="default-container" id="bitch">
      <ul>
        <Link to={"/"} className="link">
          Main Page
        </Link>
        <Link to={"/games"} className="link">
          Games
        </Link>
        <RandomGame />
        <Link to={"/about"} className="link">
          About
        </Link>
      </ul>
    </div>
  );
}
