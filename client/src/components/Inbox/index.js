import React, { useEffect, useState } from "react";
import "./inbox.css";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { baseUrl } from "../../common/constants";
const Inbox = () => {
  const socket = io(baseUrl);

  const [move, setMove] = useState([]);
  const [error, setError] = useState("");
  const { pathname } = useLocation();
  const getPath = pathname.split("/");
  const currentUser = localStorage.getItem("userName");

  const users = [currentUser, getPath[3]];

  const random = users.sort();

  const [player, setPlayer] = useState(random[0]);

  useEffect(() => {
    const userToJoin = { p1: currentUser };
    socket.emit("join-game", userToJoin);
  }, []);

  const played = (id) => {
    if (player === "Game Over") {
      return null;
    }
    const overRideMove = move.filter((e) => e.id === id).length > 0;
    const isMyTurn = currentUser === player;
    if (!overRideMove && isMyTurn) {
      setError("");
      const myTurn = {
        currentUser,
        id,
        tick: move.length % 2 === 0 ? "X" : "0",
        p2: getPath[3],
      };
      socket.emit("new-move", myTurn);
    } else {
      setError(overRideMove ? "Move can't be undo" : "Wait for your turn");
    }
  };

  socket.on("rec", (myTurn) => {
    setPlayer(myTurn.p2);
    setMove((move) => [...move, myTurn]);
    checkWin();
  });

  const checkWin = () => {
    var cnt, cnt1, cnt2, cnt3, cnt4, cnt5, cnt6, cnt7, cnt8;

    cnt = document.getElementById("1").innerHTML;
    cnt1 = document.getElementById("2").innerHTML;
    cnt2 = document.getElementById("3").innerHTML;
    cnt3 = document.getElementById("4").innerHTML;
    cnt4 = document.getElementById("5").innerHTML;
    cnt5 = document.getElementById("6").innerHTML;
    cnt6 = document.getElementById("7").innerHTML;
    cnt7 = document.getElementById("8").innerHTML;
    cnt8 = document.getElementById("9").innerHTML;

    if (
      (cnt == "X" && cnt1 == "X" && cnt2 == "X") ||
      (cnt == "X" && cnt3 == "X" && cnt6 == "X") ||
      (cnt1 == "X" && cnt4 == "X" && cnt7 == "X") ||
      (cnt2 == "X" && cnt5 == "X" && cnt8 == "X") ||
      (cnt3 == "X" && cnt4 == "X" && cnt5 == "X") ||
      (cnt6 == "X" && cnt7 == "X" && cnt8 == "X") ||
      (cnt2 == "X" && cnt5 == "X" && cnt8 == "X") ||
      (cnt2 == "X" && cnt4 == "X" && cnt6 == "X") ||
      (cnt == "X" && cnt4 == "X" && cnt8 == "X")
    ) {
      setError(`${random[0]} won`);
      setPlayer("Game Over");
    }
    if (
      (cnt == "0" && cnt1 == "0" && cnt2 == "0") ||
      (cnt == "0" && cnt3 == "0" && cnt6 == "0") ||
      (cnt1 == "0" && cnt4 == "0" && cnt7 == "0") ||
      (cnt2 == "0" && cnt5 == "0" && cnt8 == "0") ||
      (cnt3 == "0" && cnt4 == "0" && cnt5 == "0") ||
      (cnt6 == "0" && cnt7 == "0" && cnt8 == "0") ||
      (cnt2 == "0" && cnt5 == "0" && cnt8 == "0") ||
      (cnt2 == "0" && cnt4 == "0" && cnt6 == "0") ||
      (cnt == "0" && cnt4 == "0" && cnt8 == "0")
    ) {
      setError(`${random[1]} won`);
      setPlayer("Game Over");
    }
  };

  const refresh = () => {
    const finish = {
      currentUser,
      p2: getPath[3],
    };
    socket.emit("new-game", finish);
  };
  socket.on("finish-it", () => {
    setMove([]);
    setPlayer(random[0]);
    setError("");
  });

  return (
    <center>
      <h1>
        {player} {player !== "Game Over" && "turn"}
      </h1>
      <table className="mt-5">
        <tr>
          {[1, 2, 3].map((arr, index) => (
            <td key={index} onClick={() => played(arr)}>
              <p className="text-center" id={arr}>
                {move.map((s, i) => s.id === arr && s.tick)}
              </p>
            </td>
          ))}
        </tr>
        <tr>
          {[4, 5, 6].map((arr, index) => (
            <td key={index} onClick={() => played(arr)}>
              <p className="text-center" id={arr}>
                {move.map((s, i) => s.id === arr && s.tick)}
              </p>
            </td>
          ))}
        </tr>
        <tr>
          {[7, 8, 9].map((arr, index) => (
            <td key={index} onClick={() => played(arr)}>
              <p className="text-center" id={arr}>
                {move.map((s, i) => s.id === arr && s.tick)}
              </p>
            </td>
          ))}
        </tr>
      </table>
      <p className="text-danger mt-4">{error}</p>
      <br />
      <button id="result" class="st" onClick={refresh}>
        New Game
      </button>
      <br />
      <br />
    </center>
  );
};

export default Inbox;
