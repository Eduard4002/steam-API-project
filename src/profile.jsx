import "./assets/css/profile.css";
import imagePlaceholder from "./assets/img/imgPlaceholder.jpg";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import ToggleVisibility from "./assets/components/ToggleVisibility";
import { Link } from "react-router-dom";
import DarkMode from "./assets/components/DarkMode";
import ListGames from "./assets/components/ListGames";


function Profile() {
  const loggedInUserId = localStorage.getItem("user");

  if (!loggedInUserId) {
    return (
      <p className="logInQ">
        You are not logged in. To continue, please{" "}
        <Link to={"/login"}> Log In </Link> or{" "}
        <Link to={"/signup"}> Sign Up </Link>{" "}
      </p>
    );
  }

  const user = JSON.parse(localStorage.getItem("user"));


  return (
    <>
      <ToggleVisibility>
        <StuckMenu /> {/* Use the Slideshow component */}
      </ToggleVisibility>
      
      <div className="profileDiv">
        <div className="profileName">
          <h1>Hi, {user.username} </h1>
        </div>
        <div className="profileContainer">
          <div className="settingsDiv">
            <h3>Settings</h3>
            <div className="settingsGrid">
              <div className="settingsHeader">
                <h3>Main Settings</h3>
              </div>
              <div className="settingsCard">
            <DarkMode/>
              {/* <DarkModeToggle /> */}
                              {/* <input type="checkbox" name="" id="" />
                              <label>DarkMode</label> */}
                            </div>
                            {/* <div className="settingsCard">
                              <input type="checkbox" name="" id="" checked />
                              <label>Något annat</label>
                            </div> */}
              <div className="settingsHeader">
                <h3>Profile Settings</h3>
              </div>
              <div className="settingsCard">
                <h5>Change Password:</h5>
                <label>Current Password:</label>
                <input type="password" name="" id="" />
                <label>New Password:</label>
                <input type="password" name="" id="" />
                <input type="submit" value="Change Password" />
              </div>
              <div className="settingsCard">
                <h5>Delete User:</h5>
                <input type="button" value="Delete User" />
              </div>
            </div>
          </div>
          <div className="favoritesDiv">
            <h3>Recent favorites</h3>    
            <ListGames dataToDisplay={user.favorites.slice(-3).reverse()} />
            <div className="favoritesGrid">
              <div className="favoritesCard">
                <img src={imagePlaceholder} alt="Picture of Favorite Game" />
                <div className="favoritesText">
                  <h3>Game Title</h3>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dolores odio placeat, molestias ratione facere maiores
                    totam. Saepe minima, ducimus ipsa fugit omnis eveniet
                    ratione, provident itaque minus quidem mollitia earum!
                  </p>
                </div>
              </div>
              <hr />











              <div className="favoritesCard">
                <img src={imagePlaceholder} alt="Picture of Favorite Game" />
                <div className="favoritesText">
                  <h3>Game Title</h3>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dolores odio placeat, molestias ratione facere maiores
                    totam. Saepe minima, ducimus ipsa fugit omnis eveniet
                    ratione, provident itaque minus quidem mollitia earum!
                  </p>
                </div>
              </div>
              <hr />
              <div className="favoritesCard">
                <img src={imagePlaceholder} alt="Picture of Favorite Game" />
                <div className="favoritesText">
                  <h3>Game Title</h3>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dolores odio placeat, molestias ratione facere maiores
                    totam. Saepe minima, ducimus ipsa fugit omnis eveniet
                    ratione, provident itaque minus quidem mollitia earum!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default Profile;
