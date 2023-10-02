import "./assets/css/favorites.css";
import imagePlaceholder from "./assets/img/imgPlaceholder.jpg";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import ToggleVisibility from "./assets/components/ToggleVisibility";
import { Link } from "react-router-dom";

function Favorites() {
  return (
    <>
      <ToggleVisibility>
        <StuckMenu /> {/* Use the Slideshow component */}
      </ToggleVisibility>
      <div className="favoritesDiv">
        <h1>Your Favorites</h1>
        <template>
            <Link to={""}>
              <div className="favoriteCard">
                <img src={imagePlaceholder} alt="Game thumbnail" />
                <div className="favoriteText">
                  <h3>Game Title</h3>
                  <p>Hejsan på digsan</p>
                </div>
                <div className="favoriteSettings">
                  <span className="material-symbols-outlined">grade</span>
                </div>
              </div>
            </Link>
        </template>
      </div>
    </>
  );
}
export default Favorites;
