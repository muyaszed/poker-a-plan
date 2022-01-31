import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function NewSession() {
  const [sessionInfo, setSessionInfo] = useState({
    sessionName: "",
    adminName: "",
  });
  const [viewOnly, setViewOnly] = useState(false);

  function handleSessionIfoChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.name === "session-name") {
      setSessionInfo({
        ...sessionInfo,
        sessionName: event.target.value,
      });
    }

    if (event.target.name === "admin-name") {
      setSessionInfo({
        ...sessionInfo,
        adminName: event.target.value,
      });
    }
  }

  return (
    <div className="new-session-container">
      <div className="main-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="new-input-group">
        <input
          className="text-input"
          name="session-name"
          value={sessionInfo.sessionName}
          onChange={handleSessionIfoChange}
          type="text"
          placeholder="Session name"
        />
        <input
          className="text-input"
          name="admin-name"
          value={sessionInfo.adminName}
          onChange={handleSessionIfoChange}
          type="text"
          placeholder="Admin name"
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
        to={`/sessions/${
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
        }/${sessionInfo.sessionName}/${sessionInfo.adminName}/true/${
          viewOnly ? "view" : "user"
        }`}
      >
        <button className="new-session-btn btn">New session</button>
      </Link>
    </div>
  );
}

export default NewSession;
