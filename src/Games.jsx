import "./assets/css/games.css";

function Games() {
  return (
    <>
      <div className="mainGamesDiv">
        <div className="filterDiv">

        </div>
        <div className="gameListDiv">
          <div className="game1Div">
            <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt="a" className="img" />
            <div className="textDiv">
              <h2 className="gameName">Name Of Game</h2>
              <h3 className="description">Description</h3>
            </div>
            <div className="clickables">
              <div className="favourite"></div>

              <div className="button"></div>
            </div>
            
          </div>

        </div>
      </div>
    </>
  );
}
export default Games;