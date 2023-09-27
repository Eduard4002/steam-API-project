import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./assets/components/header.jsx";
import ListGames from "./assets/components/ListGames.jsx";
import "./assets/css/listGames.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListGames />
  </React.StrictMode>
);
