import React, { useEffect, useState } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../common/constants";



export default function Chat() {
  const socket = io(baseUrl);
  const [val, setVal] = useState("");
  const [msgs, setMsgs] = useState([]);
  const { pathname } = useLocation();
  const getPath = pathname.split("/");
  const currentUser = localStorage.getItem("userId");
  const currentUserName = localStorage.getItem("userName");
  const messagesEndRef = React.useRef(null);

  
  useEffect(() => {
    const userToJoin = {
      msgTo: getPath[2],
      msgFrom: currentUser
    }
    socket.emit("join-room", userToJoin);
  }, [pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(()=>{
    scrollToBottom();
  },[msgs])

  socket.on('my-chats',chats=>{
    setMsgs(chats[0].message);
  })

  socket.on("rec", (val) => {
    setMsgs(msgs=> [...msgs, val ]);
  });



  const send = (e) => {
    e.preventDefault();
    const user = {
      msgTo: getPath[2],
      msgFrom: currentUser,
      msgFromName: currentUserName,
      msg: val
    }
    socket.emit("message", user);
    setVal("");
  };

  useEffect(()=>{
    return () => {
      socket.emit('remove-room',getPath[2]);
    }
  },[])

  return (
    <div>
      <h1> <i className="fa fa-user" aria-hidden="true"></i> {getPath[3]}</h1>
      <hr/>
      <ul className="list-group list-group-flush">
        {msgs.map((msg, index) => (
          <li key={index} className="list-group-item" >
            <p className={`${currentUser === msg.currentUser ? 'float-end' : 'float-start'} bg-info p-3 rounded-pill text-white`}>{msg.msg}</p>
            </li>
        ))}
      </ul>
      <div ref={messagesEndRef}/>
       

      <form id="form">
        <input
          id="input"
          autoComplete="off"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />

        <button onClick={send}>Send</button>
      </form>
    </div>
  );
}
