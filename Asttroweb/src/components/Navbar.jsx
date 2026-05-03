import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".nav-item", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.5,
      });

       gsap.from(".right-items", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.5,
      });

      gsap.from('.nav-logo', {
        y:20,
        opacity:0,
        duration:1,
        delay:1,
      })
    },
    { scope: navRef } // VERY IMPORTANT
  );

  return (
    <div
      ref={navRef}
      className="navbar h-25 flex text-xl justify-between lg:px-8 items-center border-b-4 border-b-gray-100"
    >
      <ul className="lg:flex lg:gap-10 hidden">
        <li className="nav-item">
          <a href="#">Service</a>
        </li>
        <li className="nav-item">
          <a href="#">Work</a>
        </li>
        <li className="nav-item">
          <a href="#">About</a>
        </li>
      </ul>

      <h2 className=" nav-logo lg:text-3xl absolute lg:static top-12 left-4 font-bold">
        <i className="ri-shining-2-fill text-white px-1 py-1 rounded-2xl bg-violet-800"></i>{" "}
        Astratto
      </h2>

      <div className=" right-items flex gap-10 items-center">
        <h4 className="right-items hidden md:block">Careers</h4>
        <button className=" px-3 absolute lg:static right-2 shadow-md duration-200 hover:scale-105 text-[15px] lg:text-[25px] hover:bg-violet-700 hover:text-white rounded-3xl border md:py-2">
          Contact Us{" "}
          <i className=" ri-arrow-right-up-line text-xl lg:text-2xl text-violet-700 hover:text-white"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
