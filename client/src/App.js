import React from "react";
import {Login, Register} from "./components/signup";
import Dashboar from "./components/dashboard";
import Chat from "./components/chat/Chat";
import Navbar from './components/navbar';
import Inbox from "./components/Inbox";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboar />} />
          <Route path="/chat/:id/:name" element={<Chat />} />
          <Route path="/inbox" element={<Inbox/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
