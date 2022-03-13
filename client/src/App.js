import React from "react";
import {Dashboar, Register} from "./components/signup";
import Dashboar from "./components/dashboard";
import Chat from "./components/chat/Chat";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat/:id/:name" element={<Chat />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
