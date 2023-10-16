import { Link, useNavigate } from "react-router-dom";
import ToggleVisibility from "./assets/components/ToggleVisibility";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import "./assets/css/logInPage.css";
import axios from "axios";

function LogIn() {
  const navigate = useNavigate();

  function loggingIn(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    axios
      .post("http://localhost:3000/login", { username, password })
      .then((response) => {
        const { success } = response.data;
        if (success) {
          window.localStorage.setItem("CurrLogged", response.data.userId);
          //navigate("/");
          window.location.href = "/";
        } else {
          alert("Wrong details bozo");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /* const loggedInUserId = localStorage.getItem("user");

  if (loggedInUserId) {
    return (
      <p className="logInQ">
        You are already logged in. Go to <Link to={"/"}> Home Page </Link> or{" "}
        <Link to={"/profile"}> Profile Page </Link> to continue.{" "}
      </p>
    );
  } */

  return (
    <>
      {/* <ToggleVisibility>
        <StuckMenu /> 
      </ToggleVisibility> */}

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
          Dont have an account? <Link to={"/signup"}>Sign up</Link> to continue{" "}
        </p>
      </div>
    </>
  );
}

export default LogIn;
