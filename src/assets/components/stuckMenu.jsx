import "../css/sidebar.css"
import { Link } from "react-router-dom";

export default function stuckMenu() {
  return (
    <div className="default-container" >

      <ul>
        <li><Link to={""}><div>Main Page</div></Link></li>
        <li><Link to={"/games"}><div>Games</div></Link></li>
        <li><Link to={""}><div>Random</div></Link></li>
        <li><Link to={""}><div>Something</div></Link></li>
        </ul>
    </div>
  );  
}

