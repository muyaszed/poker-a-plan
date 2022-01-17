import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import UserCard from "../components/userCard";

export interface User {
  id: string;
  name: string;
  room: string;
  selection: string;
}

let socket: Socket;

function Sessions() {
  const params = useParams();
  const [welcomeMessage, setWelcomMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [admin, setAdmin] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [resultDisabled, setResutlDisabled] = useState(true);

  useEffect(() => {
    if (params.admin === "true") {
      setAdmin(true);
    }
    socket = io(
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : process.env.REACT_APP_BACK_END_POINT || ""
    );
    socket.emit(
      "join",
      {
        sessionId: params.sessionId,
        sessionName: params.sessionName,
        name: params.name,
      },
      (error: string) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }, [params.admin, params.name, params.sessionId, params.sessionName]);

  useEffect(() => {
    socket.on("welcome", ({ text }) => {
      setWelcomMessage(text);
    });
  }, []);

  useEffect(() => {
    socket.on("all-users", ({ users }) => {
      setUsers(users);
      console.log("all-users", users);
      setResutlDisabled(!users.every((user: User) => user.selection !== null));
    });
  }, []);

  useEffect(() => {
    socket.on("show-result", ({ showResult }) => {
      setShowResult(showResult);
    });
  }, []);

  function getSharedURL() {
    const sessionName = params.sessionName?.split(" ").join("%") ?? "";

    return `${window.location.origin}/#/sessionsUser/${params.sessionId}/${sessionName}`;
  }

  function handleNumberSelection(e: React.MouseEvent<HTMLDivElement>) {
    setSelectedNumber(e.currentTarget.id);
    console.log("handleNumberSeelction", params);
    socket.emit(
      "user-select",
      {
        userSelection: e.currentTarget.id,
        sessionId: params.sessionId,
      },
      (error: string) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }

  function handleShowResult() {
    socket.emit(
      "request-show-result",
      {
        sessionId: params.sessionId,
      },
      (error: string) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }

  return (
    <div>
      <h1>{params.sessionName?.split("%").join(" ")}</h1>
      <p>{welcomeMessage}</p>
      <div className="main-group-container">
        {users.map((user) => (
          <UserCard key={user.id} user={user} showResult={showResult} />
        ))}
      </div>
      {admin && (
        <button disabled={resultDisabled} onClick={handleShowResult}>
          Show result
        </button>
      )}
      <div className="selection-list-container">
        {[0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?"].map((selection) => (
          <div
            className={
              selectedNumber === selection.toString()
                ? "selection-card-active"
                : "selection-card"
            }
            id={selection.toString()}
            onClick={handleNumberSelection}
          >
            {selection}
          </div>
        ))}
      </div>
      {admin && (
        <div>
          <div>Invite people with this url</div>
          <input
            className="invite-url"
            readOnly
            name="invite-url"
            value={getSharedURL()}
            type="text"
          />
        </div>
      )}
    </div>
  );
}

export default Sessions;
