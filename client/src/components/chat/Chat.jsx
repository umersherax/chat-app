import React, { useEffect, useState } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../common/constants";



export default function Chat() {
  const socket = io(baseUrl);
  const [val, setVal] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [userDetails, setUserDetails] = useState("");
  const { pathname } = useLocation();
  const getPath = pathname.split("/");
  const currentUser = localStorage.getItem("userId");
  
  useEffect(() => {
    const userToJoin = {
      msgTo: getPath[2],
      msgFrom: currentUser
    }
    socket.emit("join-room", userToJoin);
  }, [pathname]);

  socket.on("rec", (val) => {
    console.log(val);
    setMsgs(msgs=> [...msgs, val ]);
  });


  const send = (e) => {
    e.preventDefault();
    const user = {
      msgTo: getPath[2],
      msgFrom: currentUser,
      msg: val
    }
    socket.emit("message", user);
    setVal("");
  };

  useEffect(()=>{
    return () => {
      console.log(getPath[2])
      socket.emit('remove-room',getPath[2]);
    }
  },[])

  return (
    <div>
      <h1>Lets start chat with {getPath[3]}</h1>
      <ul id="messages">
        {msgs.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <form id="form">
        <input
          id="input"
          autocomplete="off"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />

        <button onClick={send}>Send</button>
      </form>
    </div>
  );
}
