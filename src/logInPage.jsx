import "./assets/css/logInPage.css";
// import './assets/components/Sidebar'
// import './assets/components/ToggleVisibility'


function LogIn() {
 

  return (
    <>
      <div className="logInDiv">
        <h3>Log In</h3>
        <form action="" className="logInForm">
          <label>First name:</label><br />
          <input type="text" id="fname" name="fname" value="John"></input><br />
          <label>Last name:</label><br />
          <input type="text" id="lname" name="lname" value="Doe"></input><br />
          <input type="submit" value="Submit"></input><br />
        </form>
        <p className="signUpQ"></p>
      </div>
    </>
  );
}

export default LogIn;
