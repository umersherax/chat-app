import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Users({ allUsers }) {
  const [data, setData] = useState([]);
  const redirect = useNavigate();

  useEffect(() => {
    setData(allUsers);
  }, [allUsers]);
  const startChat = (user) => {
    redirect(`/chat/${user._id}/${user.name}`);
  };
  return (
    <div className="container">
      <h1>All Users</h1>
      <ul className="list-group ">
        {data.map((user) => (
          <li className="list-group-item bg-dark text-light">
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
