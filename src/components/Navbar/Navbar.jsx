import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { base_api_url } from "../../config/config";

import Search from "../Search";

export const NavbarLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Authors",
    link: "/authors",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const DropdownLinks = [
  {
    name: "News",
    items: [], // Dynamically holds the news data
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/latest/news`);
        const { news } = await res.json();
        setNews(news);
        // console.log("Fetched news:", news);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50  bg-slate-300 backdrop-blur-sm shadow-md dark:text-white dark:bg-black ">
        <div className="px-7 py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center mr-4 gap-4 font-bold text-2xl uppercase">
              <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                BlogApp
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-6 font-bold text-xl">
                {NavbarLinks.map((data) => (
                  <li className="py-4" key={data.name}>
                    <NavLink to={data.link} activeClassName="active">
                      {data.name}
                    </NavLink>
                  </li>
                ))}
                <li className="group relative cursor-pointer  ">
                  <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px]"
                  >
                    Megamenu
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </a>
                  <div className="absolute -left-[500px] -right-[100px]   z-[9999] hidden w-[1200px] rounded-md bg-white p-4 text-black group-hover:block shadow-md">
                    <ul className="space-y-3">
                      {DropdownLinks.map((data) =>
                        data.name === "News" ? (
                          <li key={data.name}>
                            <p className="text-lg font-bold">News</p>
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 ">
                              {news.slice(0, 6).map((item) => (
                                <div
                                  key={item.id}
                                  className="bg-white rounded-md "
                                >
                                  <div className="overflow-hidden rounded-t-md">
                                    <img
                                      src={item.image}
                                      alt={item.title || "News Thumbnail"}
                                      className="h-[200px] w-[400px] rounded-t-md object-cover"
                                    />
                                  </div>
                                  <div className="p-2">
                                    <p className="bg-red-100 text-red-500 font-bold p-1  mt-4 rounded-xl uppercase text-sm max-w-[150px] text-center truncate">
                                      {item.category}
                                    </p>
                                    <Link to={`/news/${item.slug}`}>
                                      <p className="text-sm font-bold hover:underline">
                                        {item.title}
                                      </p>
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </li>
                        ) : (
                          <li key={data.name}>
                            <a
                              className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                              href={data.link}
                            >
                              {data.name}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <Search />
            </div>
            {/* <div>
              <button onClick={toggleDarkMode}>
                {darkMode ? <MdLightMode /> : <MdDarkMode />}
              </button>
            </div> */}
            <div className="flex items-center gap-4">
              <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  );
};

export default Navbar;
