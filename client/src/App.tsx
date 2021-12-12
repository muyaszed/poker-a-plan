import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Session from './pages/sessions';

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sessions/:sessionId' element={<Session />} />
     </Routes>
    </div>
  );
}

export default App;
