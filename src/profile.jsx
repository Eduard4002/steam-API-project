import "./assets/css/profile.css";
import imagePlaceholder from "./assets/img/imgPlaceholder.jpg";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import ToggleVisibility from "./assets/components/ToggleVisibility";
import ListGames from "./assets/components/ListGames";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./assets/components/DarkMode";
import axios from "axios";
import { useState, useEffect } from "react";

function Profile() {
  const loggedInUserId = localStorage.getItem("CurrLogged");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  if (!loggedInUserId) {
    return (
      <p className="logInQ">
        You are not logged in. To continue, please{" "}
        <Link to={"/login"}> Log In </Link> or{" "}
        <Link to={"/signup"}> Sign Up </Link>{" "}
      </p>
    );
  }

  const uid = {
    uid: localStorage.getItem("CurrLogged"),
  };

  useEffect(() => {
    const uid = localStorage.getItem("CurrLogged");

    axios
      .get(`http://localhost:3000/profile/${uid}`)
      .then((response) => {
        const username = response.data.username;
        setUsername(username);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function deleteUser() {
    localStorage.removeItem("CurrLogged");

    axios
      .delete(`http://localhost:3000/profile/${uid.uid}`)
      .then((response) => {
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error(error);
      });

    navigate("/");
  }

  return (
    <>
      {/* <ToggleVisibility> */}
      {/* <StuckMenu /> 
      </ToggleVisibility> */}

      <div className="profileDiv">
        <div className="profileName">
          <h1>Hi, {username} </h1>
        </div>
        <div className="profileContainer">
          <div className="settingsDiv">
            <h3>Settings</h3>
            <div className="settingsGrid">
              <div className="settingsHeader">
                <h3>Main Settings</h3>
              </div>
              <div className="settingsCard">
                <DarkMode />
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
                <input type="button" value="Delete User" onClick={deleteUser} />
              </div>
            </div>
          </div>
          <div className="favoritesDiv">
            <h3>Recent favorites</h3>
            <div className="favoritesGrid">
              <ListGames dataToDisplay={[]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
