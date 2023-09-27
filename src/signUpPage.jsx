import "./assets/css/signUpPage.css";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
      <div className="signUpDiv">
        <h3>Sign Up</h3>
        <form action="" className="signUpForm">
          <label>E-Mail:</label><br />
          <input type="text" id="lname" name="lname" placeholder="E-Mail"></input><br />
          <label>Username:</label><br />
          <input type="text" id="fname" name="fname" placeholder="Username"></input><br />
          <label>Password:</label><br />
          <input type="text" id="lname" name="lname" placeholder="Password"></input><br />
          <input type="submit" value="Submit"></input><br />
        </form>
        <p className="logInQ">Already got an account? <Link to={"/login"}>Log in</Link> to continue</p>
      </div>
    </>
  );
}
export default SignUp;
