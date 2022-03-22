import "../Navbar/Navbar.scss";
import logo from "../../assets/spaceXlogo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar topnav">
      <div className="navbar-logo">
        <img className="logo" src={logo} alt="SpaceX logo" />
      </div>
      <div className="topnav">
        <Link  to='/'>SpaceX Launches</Link>
        <Link  to='/upcoming'>Upcoming Launches</Link>
      </div>
    </div>
  );
}

export default Navbar;
