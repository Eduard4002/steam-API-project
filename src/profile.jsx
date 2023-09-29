import "./assets/css/profile.css";
import imagePlaceholder from "./assets/img/imgPlaceholder.jpg";

function Profile() {
  return (
    <>
      <div className="profileDiv">
        <div className="profileName">
          <h1>Hi, MargoGamer69!</h1>
        </div>
        <div className="profileContainer">
          <div className="settingsDiv">
            <h3>Settings</h3>
            <div className="settingsGrid">
              <div className="settingsHeader">
                <h3>Main Settings</h3>
              </div>
              <div className="settingsCard">
                <input type="checkbox" name="" id="" />
                <label>DarkMode</label>
              </div>
              <div className="settingsCard">
                <input type="checkbox" name="" id="" />
                <label>Något annat</label>
              </div>
              <div className="settingsCard">
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
                <h5>Delete User</h5>
                <input type="button" value="Delete User" />
              </div>
            </div>
          </div>
          <div className="favoritesDiv">
            <h3>Recent favorites</h3>
            <div className="favoritesGrid">
              <div className="favoritesCard">
                <img src={imagePlaceholder} alt="Picture of Favorite Game" />
                <h3>Game Title</h3>
                <p>Game Description</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
