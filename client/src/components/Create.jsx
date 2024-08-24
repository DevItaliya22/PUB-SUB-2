import React from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const gameID = generateID();

  function generateID() {
    return Math.random().toString(36).substring(2, 10);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#000000] via-[#c7c5c5] to-[#000]">
      <div className="text-center">
        <div className="mb-[5vh] text-[10vh] font-bold mix-blend-overlay">
          Create Game
        </div>
        <div className="flex flex-col items-center">
          <button
            className="bg-[#fff] text-[#000] py-2 px-6 rounded hover:bg-gray-300 transition duration-300"
            onClick={() => navigate(`/${gameID}?mode=player`)}
          >
            Create room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;