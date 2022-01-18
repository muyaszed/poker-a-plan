import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Session from "./pages/sessions";
import SessionAdmin from "./pages/sessionsAdmin";
import SessionUser from "./pages/sessionsUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='sessions/:sessionId/:sessionName/:name/:admin' element={<Session />} /> */}
        <Route
          path="sessions/:sessionId/:sessionName/:name/:admin/:sessionType"
          element={<Session />}
        />
        <Route
          path="sessionsUser/:sessionId/:sessionName"
          element={<SessionUser />}
        />
        <Route
          path="sessionsAdmin/:sessionId/:sessionName"
          element={<SessionAdmin />}
        />
      </Routes>
    </div>
  );
}

export default App;
