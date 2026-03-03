import React from "react";
import images from "../assets/assets";

const Hero = ()=> {
  return (
    <div
     className="relative w-full h-[85vh] bg-cover bg-center flex items-center px-12"
      style={{ backgroundImage: `url(${images.hero_img})` }}
    >
      <div className=" text-white max-w-xl">
        <h1 className="text-5xl font-semibold mb-4">Super Man</h1>

        <p className="text-gray-200 mb-6">
          Superman is a fictional superhero who first appeared in American comic
          books published by DC Comics.
        </p>

        <button className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition">
          Play
        </button>
      </div>
    </div>
  );
}

export default Hero;