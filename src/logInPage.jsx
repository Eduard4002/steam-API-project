import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./assets/css/logInPage.css";


function LogIn() {
  const navigate = useNavigate();

  function failed() {


  }

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
          navigate("/");
          //window.location.href = "/";
        } else {
          // alert("Wrong details bozo");

          const dialogThingi = document.getElementById("dialogThingi");
          dialogThingi.showModal();

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
        
      <dialog id="dialogThingi">
        <p>OPS something went wrong, try again</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>

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
