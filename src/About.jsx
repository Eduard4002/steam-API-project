import "../src/assets/css/about.css";
import margo from "./assets/img/margo.jpg";
import jonte from "./assets/img/jonte.jpg";

function About() {
  return (
    <>
      <h1>About Us</h1>

      <div className="main">
        <div className="aboutGrid">
          <div className="lables">
            <div className="InfoCont">
              <img src={margo} alt="Picture of Margo" />

              <div className="infoTextCont">
                <h3 className="names">Margarita</h3>
                <p className="infoText">Groupleader / Frontend</p>
              </div>

              <button className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  <a
                    className="thisA"
                    href="https://github.com/Mizfra"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    Github
                  </a>
                </span>
              </button>
            </div>

            <div className="InfoCont">
              <img src={jonte} alt="Picture of Jonte" />

              <div className="infoTextCont">
                <h3 className="names">Jonathan Th-J</h3>
                <br></br>
                <p className="infoText">Second in command / Frontend</p>
              </div>
              <button className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  <a
                    className="thisA"
                    href="https://github.com/jonte88"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    Github
                  </a>
                </span>
              </button>
            </div>

            <div className="InfoCont">
              <img src="" alt="" />

              <div className="infoTextCont">
                <h3 className="names">Eduard</h3>
                <p className="infoText">
                  Architect of the Server Realm / Backend
                </p>
              </div>
              <button className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  <a
                    className="thisA"
                    href=" https://github.com/Eduard4002"
                    target="_blank"
                  >
                    {" "}
                    Github
                  </a>
                </span>
              </button>
            </div>

            <div className="InfoCont">
              <img src="" alt="" />

              <div className="infoTextCont">
                <h3 className="names">Gustaf</h3>
                <p className="infoText">
                  Master of the Digital Engine: Backend Specialist / Backend
                </p>
              </div>

              <button className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  <a
                    className="thisA"
                    href="https://github.com/Gurrnos"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    Github
                  </a>
                </span>
              </button>
            </div>

            <div className="InfoCont">
              <img src="" alt="" />

              <div className="infoTextCont">
                <h3 className="names">Simon</h3>
                <p className="infoText">
                  End-to-End Engineer: Mastering Backend and Frontend
                </p>
              </div>

              <button className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  <a
                    className="thisA"
                    href="https://github.com/4cespx"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    Github
                  </a>
                </span>
              </button>
            </div>
          </div>

          <div className="InfoGeneralCont">
            <div className="infoGeneral">
              <h3 className="Textinfo">Game Hub</h3>
              <p className="AboutUs">
                Game Hub is an exciting project that places a strong emphasis on
                user experience. Users can explore and search for their favorite
                games from Steam, easily adding them as favorites for quick and
                convenient access. To access all features, we provide users with
                the option to log in or create an account, not only providing
                personalized access but also the ability to keep track of their
                most beloved games.
              </p>
              <p className="AboutUs">
                The curation of new games is a central aspect of Game Hub. Our
                main page offers users the opportunity to explore and discover
                new games that match their interests. Additionally, a random
                selection feature takes the user to a brand new and exciting
                game each time. We also focus on promoting games that are less
                popular and often overlooked. Browse through a collection of 100
                games, including both the most popular titles and those you may
                have never heard of before. We assist you in finding new
                experiences and storing them for easier access.
              </p>{" "}
              <p className="AboutUs">
                We utilize a robust API to retrieve information about the 100
                selected games from Steam, providing our users with access to
                current and reliable data about their favorite games. For those
                interested in purchasing games, our platform also offers a
                seamless transition to Steam for further transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
