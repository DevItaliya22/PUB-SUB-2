import React from 'react';
import {useNavigate } from "react-router-dom"
function Home() {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#000000] via-[#c7c5c5] to-[#000]">
      <div className="text-center">
        <div className=" mb-[5vh] text-[10vh] mix-blend-overlay">Join or create a game</div>
        <div>
          <button className="bg-[#fff] text-[#000] py-2 px-4 rounded mr-2" onClick={()=>navigate("/join")}>Join</button>
          <button className="bg-[#000] text-[#fff] py-2 px-4 rounded" onClick={()=>navigate("/create")}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default Home;