import "../css/header.css";
import Logo from '../img/logo.png'

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
          <span className="material-symbols-outlined">person</span>
          <span className="material-symbols-outlined">favorite</span>
        </div>
      </nav>
    </>
  );
}

export default Header;
