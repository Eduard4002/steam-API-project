import "../css/sidebar.css";
import { Link } from "react-router-dom";
import DataArray from "../../DataArray";
export default function stuckMenu() {
  const data = DataArray();

  if (data.length === 0) return <h1>LOADING</h1>;
  const randomGameIndex = Math.floor(Math.random() * data.length);
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
        <Link to={"/game/" + data[randomGameIndex].appid} className="link">
          Random
        </Link>
      </ul>
    </div>
  );
}
