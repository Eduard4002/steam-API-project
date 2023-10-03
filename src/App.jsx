import "./App.css";
import "./assets/components/Default";
import "./assets/components/ToggleVisibility";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import Slideshow from "./assets/components/slideshow";
import ImagePlaceholder from "./assets/img/imgPlaceholder.jpg";
// import { createContext, useState } from "react"; 
// import ReactSwitch from "react-switch";


// export const ThemeContext = createContext (null)

function App() {
  const images = [ImagePlaceholder, ImagePlaceholder, ImagePlaceholder];
  // const [theme, setTheme] = useState("dark"); 

// const toggleTheme = () =>{
//   setTheme ((curr) => (curr === "dark" ? "light" : "dark"));
// };

  return (

    <>


      {/* Other components */}
      <StuckMenu /> {/* Use the Slideshow component */}
      {/* Other components */}

  

      <div className="appContainer">
        {/* <ReactSwitch onChange={toggleTheme} checked={theme === "light"}/> */}
        <div className="slideWrapper">
          <Slideshow />
        </div>
        <div className="favoriteGrid">
          <div
            className="favoriteCard"
            style={{ backgroundImage: `url(${images[0]}` }}
          >
            <span className="favoriteStar material-symbols-outlined">
              grade
            </span>
          </div>
          <div
            className="favoriteCard"
            style={{ backgroundImage: `url(${images[1]}` }}
          >
            <span className="favoriteStar material-symbols-outlined">
              grade
            </span>{" "}
          </div>
          <div
            className="favoriteCard"
            style={{ backgroundImage: `url(${images[2]}` }}
          >
            <span className="favoriteStar material-symbols-outlined">
              grade
            </span>
          </div>
        </div>
      </div>
      {/* </ThemeContext.Provider> */}
    </>
  );
}
export default App;
