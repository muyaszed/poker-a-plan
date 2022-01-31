import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import UserCard from "../components/userCard";
import logo from "../assets/images/logo.png";

export interface User {
  id: string;
  name: string;
  room: string;
  selection: string;
  admin: boolean;
  viewOnly: boolean;
}

let socket: Socket;

function Sessions() {
  const params = useParams();
  const [welcomeMessage, setWelcomMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [resultDisabled, setResutlDisabled] = useState(true);

  useEffect(() => {
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
        admin: params.admin === "true" ? true : false,
        viewOnly: params.sessionType === "view" ? true : false,
      },
      (error: string) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }, [
    params.admin,
    params.name,
    params.sessionId,
    params.sessionName,
    params.sessionType,
  ]);

  useEffect(() => {
    socket.on("welcome", ({ text, user }) => {
      setWelcomMessage(text);
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    socket.on("all-users", ({ users }) => {
      setUsers(users);
      console.log("all-users", users);
      setResutlDisabled(
        users.filter((user: User) => !user.viewOnly).length
          ? !users
              .filter((user: User) => !user.viewOnly)
              .every((filteredUser: User) => filteredUser.selection !== null)
          : true
      );
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

  console.log(currentUser);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="session-container">
      <div className="header">
        <div className="main-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="title-group">
          <h1>{params.sessionName?.split("%").join(" ")}</h1>
          <div className="welcome-message">{welcomeMessage}</div>
        </div>
      </div>

      <div className="main-group-container">
        {users
          .filter((user) => !user.viewOnly)
          .map((filteredUser) => (
            <UserCard
              key={filteredUser.id}
              user={filteredUser}
              showResult={showResult}
            />
          ))}
      </div>
      {currentUser.admin && (
        <div className="show-result-container">
          <button
            className="show-result-btn btn"
            disabled={resultDisabled}
            onClick={handleShowResult}
          >
            Show result
          </button>
        </div>
      )}
      {!currentUser.viewOnly && (
        <div className="selection-list-container">
          {[0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?"].map((selection) => (
            <div
              key={selection}
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
      )}

      {users.some((user) => user.viewOnly) && (
        <div className="visitor-group">
          <p className="visitor-title">Visitors</p>
          <div className="main-group-container visitors-area">
            {users
              .filter((user) => user.viewOnly)
              .map((filteredUser) => (
                <UserCard
                  key={filteredUser.id}
                  user={filteredUser}
                  showResult={showResult}
                />
              ))}
          </div>
        </div>
      )}

      {currentUser.admin && (
        <div className="invite-container">
          <div className="invite-title">Invite people with this url</div>
          <input
            className="text-input invite-url"
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
