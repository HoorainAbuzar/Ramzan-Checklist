import React from "react";
import img from "../assets/img.jpg";
import { useNavigate } from "react-router-dom";

const Dua = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[90%] p-8 bg-gradient-to-b h-screen from-green-200 to-green-600 flex flex-col items-center justify-center">
      <h2 className="my-3 font-bold bg-pink-400 w-full text-center">Muhib e Islam (Islamic Corner) </h2>
      <img className="shadow-xl md:w-[40%]" src={img} alt="" />
      <button
        onClick={() => navigate("/checklist")}
        className="bg-green-900 hover:bg-green-300 hover:text-black transition-all duration-300 w-full rounded py-2 mt-3 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Dua;
