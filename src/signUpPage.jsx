import "./assets/css/signUpPage.css";

function SignUp() {
  return (
    <>
      <div className="signUpDiv">
        <h3>Sign Up</h3>
        <form action="" className="signUpForm">
          <label>E-Mail:</label><br />
          <input type="text" id="lname" name="lname" value="Doe"></input><br />
          <label>Username:</label><br />
          <input type="text" id="fname" name="fname" value="John"></input><br />
          <label>Password:</label><br />
          <input type="text" id="lname" name="lname" value="Doe"></input><br />
          <input type="submit" value="Submit"></input><br />
        </form>
        <p className="logInQ"></p>
      </div>
    </>
  );
}
export default SignUp;
