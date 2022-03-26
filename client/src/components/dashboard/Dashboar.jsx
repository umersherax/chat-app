import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Users from "./Users";
import { baseUrl } from "../../common/constants";

export default function Dashboar() {
  const redirect = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInfo();
  }, []);

  const getInfo = async () => {
    const loggedIn = await axios.get(`${baseUrl}get-info`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    if (loggedIn.data.valid === false) {
      redirect("/");
    } else {
      const allUsers = await axios.get(`${baseUrl}all-users`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setAllUsers(allUsers.data);
    }

    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <center>
          <h1 style={{ marginTop: 250, fontSize: 100 }}>
            <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
          </h1>
        </center>
        
      ) : (
        <div className="mt-5">
          <Users allUsers={allUsers} />
        </div>
      )}
    </div>
  );
}
