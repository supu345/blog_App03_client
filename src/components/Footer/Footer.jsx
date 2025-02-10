import React, { useRef } from "react";
import { CiYoutube } from "react-icons/ci";
//import FooterLogo from "../../assets/logo.png";
import {
  FaArrowUp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Authors",
    link: "/authors",
  },
  {
    title: "Blogs",
    link: "/blogs",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const Footer = () => {
  const nav = useRef();

  const scrollTop = () => {
    const scrollStep = -window.scrollY / 50;
    const delay = 10;

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, delay);
  };
  return (
    <>
      <div className="dark:bg-gray-950 py-10 relative overflow-hidden px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 py-5 bg-white/80 backdrop-blur-sm rounded-t-xl items-center">
          {/* left */}

          <div className="">
            <div className="py-4 px-6 md:px-10 text-center md:text-left">
              <h1 className="flex justify-center md:justify-start items-center uppercase gap-3 text-xl sm:text-3xl font-bold">
                BlogApp
              </h1>
            </div>
          </div>
          {/* middle */}
          <div className="">
            <div className="flex justify-center md:justify-center md:col-span-2 gap-6 px-6 md:px-0">
              <div className="flex gap-4 justify-center md:justify-start">
                <FaInstagram className="text-3xl cursor-pointer hover:text-primary transition" />
                <FaFacebook className="text-3xl cursor-pointer hover:text-primary transition" />
                <FaLinkedin className="text-3xl cursor-pointer hover:text-primary transition" />
                <CiYoutube className="text-4xl cursor-pointer hover:text-primary transition" />
              </div>
            </div>
          </div>
          {/* right */}
          <div className="">
            <div className="mt-6 md:mt-0 flex justify-center  px-6 md:px-10">
              <ul className="flex flex-wrap justify-center gap-4">
                {FooterLinks.map((link, index) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary text-gray-700 dark:text-gray-200"
                  >
                    <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                      <span className="text-base md:text-xl font-bold">
                        {link.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}

      <div className="text-center py-5 border-t border-gray-300/50 text-gray-700 dark:text-gray-200">
        © 2025 All rights reserved || Made with Suparna
      </div>

      <div
        onClick={scrollTop}
        id="scroll"
        className="fixed bottom-4 right-4 cursor-pointer"
      >
        <button className="bg-slate-300 p-3 rounded-full shadow-md">
          <span>
            <FaArrowUp />
          </span>
        </button>
      </div>
    </>
  );
};

export default Footer;
