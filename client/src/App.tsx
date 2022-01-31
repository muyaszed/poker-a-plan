import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NewSession from "./pages/newSession";
import Session from "./pages/sessions";
import SessionUser from "./pages/newSessionsUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="new" element={<NewSession />} />

        <Route
          path="sessions/:sessionId/:sessionName/:name/:admin/:sessionType"
          element={<Session />}
        />
        <Route
          path="sessionsUser/:sessionId/:sessionName"
          element={<SessionUser />}
        />
      </Routes>
    </div>
  );
}

export default App;
