import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to={"/"}>
              <strong>Home</strong>
            </Link>
          </li>
          <li>
            <Link to={"/sign-in"}>Sign In</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
