import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { io } from "socket.io-client";

function Game() {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const { gameid } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode');

  const navigate = useNavigate();

  const handleExit = () => {
    if (socket) {
      socket.emit("unsubscribe", { gameId: gameid, userId: socket.id });
      navigate('/');
    }
  };

  const handleIncrement = () => {
    if (socket) {
      socket.emit("publish", { gameId: gameid, userId: socket.id });
    }
  };

  useEffect(() => {
    const Socket = io("http://localhost:3000");

    Socket.on("connect", () => {
      Socket.emit("subscribe", { gameId: gameid, userId: Socket.id, mode });
      setSocket(Socket);
    });

    Socket.on("update", (updatedUsers) => {
      setUsers(updatedUsers);
    });

    window.addEventListener("beforeunload", () => {
      Socket.emit("unsubscribe", { gameId: gameid, userId: Socket.id });
    });

    return () => {
      if (Socket) {
        Socket.emit("unsubscribe", { gameId: gameid, userId: Socket.id });
        Socket.disconnect();
      }
    };
  }, [gameid, mode]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <div className="flex justify-center gap-[30px] w-full px-10 py-4">
        <div className="bg-white text-black text-[20px] py-2 px-4 rounded hover:bg-gray-300 cursor-pointer" onClick={() => {
          navigator.clipboard.writeText(gameid);
        }}>GAME ID : {gameid}</div>

        {socket && <div className="bg-white text-black text-[20px] py-2 px-4 rounded hover:bg-gray-300 cursor-pointer" onClick={() => {
          navigator.clipboard.writeText(gameid);
        }}>SOCKET ID : {socket.id}</div>}

        <button
          className="bg-white text-black py-2 px-4 rounded hover:bg-gray-300"
          onClick={handleIncrement}
        >
          Increment
        </button>

        <button
          className="bg-red-600 text-white font-[600] py-2 px-4 rounded hover:bg-gray-300"
          onClick={handleExit}
        >
          Exit
        </button>
      </div>

      <div className="w-full font-[600] max-w-2xl border border-white mt-8">
        <table className="w-full table-auto border-collapse border border-white">
          <thead>
            <tr>
              <th className="border text-[#ffffff] border-white px-4 py-2">Username</th>
              <th className="border text-[#fff] border-white px-4 py-2">Count</th>
              <th className="border text-[#fff] border-white px-4 py-2">Mode</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border border-white px-4 py-2 text-center">{user.userId}</td>
                <td className="border border-white px-4 py-2 text-center">{user.count}</td>
                <td className="border border-white px-4 py-2 text-center">{user.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Game;
