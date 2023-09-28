import "./assets/css/logInPage.css";
import { Link, useNavigate } from "react-router-dom";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import ToggleVisibility from "./assets/components/ToggleVisibility";

function LogIn() {
  const navigate = useNavigate();

  function loggingIn() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userKey = username;

    const storedUserData = JSON.parse(window.localStorage.getItem(userKey));

    if (
      storedUserData &&
      username === storedUserData.username &&
      password === storedUserData.password
    ) {
      navigate("/");
    } else {
      alert("Wrong details bozo");
    }
  }

  return (
    <>
      <ToggleVisibility>
        <StuckMenu /> {/* Use the Slideshow component */}
      </ToggleVisibility>

      <div className="logInDiv">
        <h3>Log In</h3>
        <form onSubmit={loggingIn} className="logInForm">
          <label>Username:</label>
          <br />
          <input type="text" id="username" name="fname"></input>
          <br />
          <label>Password:</label>
          <br />
          <input type="password" id="password" name="lname"></input>
          <br />
          <input type="submit" value="Submit"></input>
          <br />
        </form>
        <p className="signUpQ">
          {" "}
          Don't have an account? <Link to={"/signup"}>Sign up</Link> to continue{" "}
        </p>
      </div>
    </>
  );
}

export default LogIn;
