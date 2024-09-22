import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();
  const [gameID, setGameID] = useState("");

  const handleClick = (mode) => {
    if (gameID.length !== 8) return;
    if (mode) {
      navigate(`/${gameID}?mode=${mode}`);
    }
    // websocket stuff here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#000000] via-[#c7c5c5] to-[#000]">
      <div className="text-center">
        <div className="mb-[5vh] text-[10vh] font-bold mix-blend-overlay">Join Game</div>
        <div className="flex flex-col items-center">
          <input 
            value={gameID}
            type="text" 
            onChange={(e) => setGameID(e.target.value)} 
            className="p-3 mb-4 text-center text-black rounded-lg outline-none w-80 focus:ring-2 focus:ring-gray-400" 
            placeholder="Enter Game ID" 
          />
          {gameID.length !== 8 && <div className='text-red-600'>Game ID should be 8 characters</div>}
          <div>
            <button 
              className="bg-[#fff] text-[#000] py-2 px-6 rounded mr-2 hover:bg-gray-300 transition duration-300" 
              onClick={() => handleClick("spectator")}
            >
              Spectate
            </button>
            <button 
              className="bg-[#fff] text-[#000] py-2 px-6 rounded hover:bg-gray-300 transition duration-300" 
              onClick={() => handleClick("player")}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
