import "./assets/css/favorites.css";
// import imagePlaceholder from "./assets/img/imgPlaceholder.jpg";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import ToggleVisibility from "./assets/components/ToggleVisibility";

function Favorites() {
  return (
    <>
      <ToggleVisibility>
        <StuckMenu /> {/* Use the Slideshow component */}
      </ToggleVisibility>
      <div className="favoritesDiv">
        
      </div>
    </>
  );
}
export default Favorites;
