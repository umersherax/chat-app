import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { baseUrl } from "../../common/constants";
import { Modal, Button } from "react-bootstrap";

export default function Navbar() {
  const currentUser = localStorage.getItem("userName");
  const currentUserId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState('');

  const redirect = useNavigate();
  const socket = io(baseUrl);


  const logout = () => {
    localStorage.clear();
    redirect("/");
  };

  socket.on('request-sent',user=>{
    const id = user._id;
    if(id === currentUserId){
      setShowModal(true);
      setUser(user);
    }
  });

  const accept = (flag) => {
    if(flag){
      socket.emit('request-accepted',user);
      setShowModal(false);
      redirect(`/inbox/${user?.currentUserId}/${user?.requestFrom}`);
    }else{
      socket.emit('reject-request', user);
      setShowModal(false);
    }
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Home
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" to="/register">
                  Register
                </Link>
              </li>
              {localStorage.getItem("userId") && (
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user" /> {currentUser}
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <div
                        class="dropdown-item"
                        onClick={logout}
                        style={{ cursor: "pointer" }}
                      >
                        Logout
                      </div>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>


      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Game <i className="fa fa-gamepad" aria-hidden="true"/> Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>{user?.requestFrom} just sent a game request to you</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>accept(false)}>
            No
          </Button>
          <Button variant="primary" onClick={()=>accept(true)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}
