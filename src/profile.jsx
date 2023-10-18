import axios from "axios";
import { useEffect, useState } from "react";
import DarkMode from "./assets/components/DarkMode";
import "./assets/css/profile.css";
import Favorites from "./favorites";

function Profile() {
  const loggedInUserId = localStorage.getItem("CurrLogged");
  const [username, setUsername] = useState("");

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

  function changePassword() {
    const currentPassword = document.getElementById("current").value;
    const newPassword = document.getElementById("new").value;
  
    axios
      .post("http://localhost:3000/changepassw", {
        uid: uid.uid,
        currentPassword,
        newPassword
      })
      .then((response) => {
        alert("Password changed successfully")
      })
      .catch((error) => {
        alert("Couldn't change password, try again later")
      });
  }

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

    window.location.href = "/"
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

                <form onSubmit = {changePassword}>
                  <h5>Change Password:</h5>
                  <label>Current Password:</label>
                  <input type="password" name="" id="current" />
                  <label>New Password:</label>
                  <input type="password" name="" id="new" />
                  <input type="submit" value="Change Password" />
                </form>

                
              </div>
              <div className="settingsCard">
                <h5>Delete User:</h5>
                <input type="button" value="Delete User" onClick={deleteUser} />
              </div>
            </div>
          </div>
          <div className="proFavoritesDiv">
            <h3>Recent favorites</h3>
            <div className="favoritesGrid">
              <Favorites displayFavorites = {false}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
