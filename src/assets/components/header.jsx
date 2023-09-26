import "../css/header.css";
import Logo from '../img/logo.png'
import Person from '../img/person.svg'
import Heart from '../img/heart.svg'

function Header() {

  return (
    <>
      <nav className="navBar">
        <div className="leftNav">
          <img src={Logo} alt="Logo" />
          <h1>Game API</h1>
        </div>
        <div className="middleNav">
          <input
            type="search"
            name="SearchInput"
            id="searchInput"
            placeholder="Search"
          />
        </div>
        <div className="rightNav">
          <span className="profileIcon"><img src={Person} alt="Profile" /></span>
          <span className="favoIcon"><img src={Heart} alt="Favorites" /></span>
        </div>
      </nav>
    </>
  );
}

export default Header;
