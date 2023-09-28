import "./assets/css/logInPage.css";
import StuckMenu from './assets/components/stuckMenu'; // Import your Slideshow component
import ToggleVisibility from "./assets/components/ToggleVisibility";



function LogIn() {
 

  return (
    <>
      <ToggleVisibility>
        <StuckMenu /> {/* Use the Slideshow component */}
      </ToggleVisibility>
      
      <div className="logInDiv">
        <h3>Log In</h3>
        <form action="" className="logInForm">
          <label>First name:</label>
          <br />
          <input type="text" id="fname" name="fname" value="John"></input>
          <br />
          <label>Last name:</label>
          <br />
          <input type="text" id="lname" name="lname" value="Doe"></input>
          <br />
          <input type="submit" value="Submit"></input>
          <br />
        </form>
        <p className="signUpQ"></p>
      </div>
    </>
  );
}

export default LogIn;
