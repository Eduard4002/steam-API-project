import axios from "axios";
import { Link } from "react-router-dom";
import "./assets/css/logInPage.css";



function LogIn() {

  function loggingIn(e) {
    e.preventDefault();

    const username = document.getElementById("username").value; //Get username
    const password = document.getElementById("password").value; //Get password

    axios
      .post("http://localhost:3000/login", { username, password }) //Send username and password to database to see if it matches
      .then((response) => {
        const { success } = response.data;
        if (success) {
          window.localStorage.setItem("CurrLogged", response.data.userId); //If successful, log in
          window.location.href = "/"; //Redirect to home page
        } else {
          alert("Wrong log in credentials"); //Alert the user that the details did not match

        
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
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
