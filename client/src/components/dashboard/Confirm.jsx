import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../common/constants";



const Confirm = React.memo(({ type, loadingStatus, isOpen }) => {
  const socket = io(baseUrl);
  const currentUser = localStorage.getItem("userName");
  const currentUserId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const redirect = useNavigate();

  const send = (flag) => {
    if (flag) {
      var opponent = type.user;
      opponent.requestFrom = currentUser;
      opponent.currentUserId = currentUserId;
      socket.emit("send-request", opponent);
      setLoading(true);
      socket.once("reject-it", (userX) => {
        if(userX.currentUserId === currentUserId){
          console.log(userX);
          loadingStatus();
          alert("Game request rejected");
        }
      });
    } else {
      loadingStatus();
    }
  };

  socket.on("accepted", (user) => {
    if (user.currentUserId === currentUserId) {
      setLoading(false);
      loadingStatus();
      setTimeout(()=>{
        redirect(`/inbox/${user._id}/${user.name}`);
      },2000);
    }
  });

  

  socket.on("already-playing", () => {
    setLoading(false);
    setPlaying(true);
  });

  const ok = () => {
    loadingStatus();
  };

  return (
    <div>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>
            Game <i className="fa fa-gamepad" aria-hidden="true" /> Request
          </Modal.Title>
        </Modal.Header>
        {playing ? (
          <Modal.Body>User already in game</Modal.Body>
        ) : (
          <Modal.Body>
            {loading ? (
              <div className="d-flex flex-row">
                <p style={{ marginRight: 20 }}>Request sent</p>{" "}
                <i
                  style={{ marginBottom: 15 }}
                  className="fa fa-spinner fa-spin ml-5"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <p>
                Send a game request to <b>{type.user.name.toUpperCase()}</b>
              </p>
            )}
          </Modal.Body>
        )}

        {playing ? (
          <Modal.Footer>
            <Button variant="secondary" onClick={ok}>
              OK
            </Button>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
            <Button variant="secondary" onClick={() => send(false)}>
              No
            </Button>
            <Button variant="primary" onClick={() => send(true)}>
              Yes
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
});

export default Confirm;
