import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Users({ allUsers }) {
  const [data, setData] = useState([]);
  const redirect = useNavigate();
  const currentUser = localStorage.getItem("userId");

  useEffect(() => {
    setData(allUsers);
  }, [allUsers]);
  const startChat = (user) => {
    redirect(`/chat/${user._id}/${user.name}`);
  };
  return (
    <div className="container">
      <h1>All Users</h1>
      <ul className="list-group mt-5">
        {data.map((user, index) => (
          currentUser !== user._id &&
          <li className="list-group-item bg-dark text-light" key={index}>
            <div className="d-flex flex-row justify-content-between">
              <p>{user.name}</p>
              <button
                className="btn btn-info btn-small"
                onClick={() => startChat(user)}
              >
                Chat
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
