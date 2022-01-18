import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function SessionUser() {
  const [userName, setUserName] = useState("");
  const [viewOnly, setViewOnly] = useState(false);
  const params = useParams();

  return (
    <div>
      <h1>Please enter your name</h1>
      <input
        name="user-name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        placeholder="Your name"
      />
      <label>Spectator mode</label>
      <input
        onChange={() => setViewOnly((prevState) => !prevState)}
        type="checkbox"
      />
      <Link
        to={`/sessions/${params.sessionId}/${params.sessionName}/${userName}/${
          viewOnly ? "view" : "user"
        }`}
      >
        <button>Enter</button>
      </Link>
    </div>
  );
}

export default SessionUser;
