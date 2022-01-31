import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Home() {
  return (
    <div className="home-container">
      <div className="main-logo">
        <img src={logo} alt="logo" />
      </div>

      <Link to={"new"}>
        <button className="get-started-btn btn">Get Started</button>
      </Link>
    </div>
  );
}

export default Home;
