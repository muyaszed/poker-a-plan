import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../assets/images/logo.png";

function NewSessionUser() {
  const [userName, setUserName] = useState("");
  const [viewOnly, setViewOnly] = useState(false);
  const params = useParams();

  return (
    <div className="new-session-container">
      <div className="main-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="new-input-group">
        <input
          className="text-input"
          name="user-name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Your name"
        />
        <div className="check-box-group">
          <label className="check-box-wrapper">
            guest only
            <input
              type="checkbox"
              onChange={() => setViewOnly((prevState) => !prevState)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>

      <Link
        to={`/sessions/${params.sessionId}/${
          params.sessionName
        }/${userName}/false/${viewOnly ? "view" : "user"}`}
      >
        <button className="new-session-btn btn">Enter</button>
      </Link>
    </div>
  );
}

export default NewSessionUser;
