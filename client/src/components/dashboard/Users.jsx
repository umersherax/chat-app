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

  const startGame = (user) => {
    redirect(`/inbox/${user._id}/${user.name}`);
  };

  return (
    <div className="container">
      <h1>
        {" "}
        <i className="fa fa-table" aria-hidden="true"></i> All Users
      </h1>
      <table className="table table-dark table-hover table-borderless" s>
        <thead>
          <tr>
            <th className="p-3" scope="col">#</th>
            <th className="p-3" scope="col">User Name</th>
            <th className="p-3" scope="col">
              <div className="d-flex flex-row">
                <p>Chat</p>
                <p style={{ marginLeft: 25 }}>Game</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (user, index) =>
              currentUser !== user._id && (
                <tr key={index}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">
                    {
                      <div>
                          <i style={{ marginLeft: 10, cursor: "pointer", color:"#0DCAF0" }} className="fa fa-envelope" aria-hidden="true" onClick={() => startChat(user)} />
                          <i style={{ marginLeft: 50, cursor: "pointer", color:"#0DCAF0" }} onClick={() => startGame(user)} className="fa fa-gamepad" aria-hidden="true"></i>
                      </div>
                    }
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
