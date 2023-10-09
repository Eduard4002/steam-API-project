import { Link, useNavigate } from "react-router-dom";
import ToggleVisibility from "./assets/components/ToggleVisibility";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import "./assets/css/logInPage.css";


function LogIn() {
  const navigate = useNavigate();

  function loggingIn() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    const usersArr = JSON.parse(localStorage.getItem("users"));

    //Loop through all users saved in localstorage
    usersArr.map((user) => {

      if (
        username === user.username &&
        password === user.password
      ) {
        window.localStorage.setItem("CurrLogged", user.id);
        navigate("/");
      } else {
        alert("Wrong details bozo");
      }
    })

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
