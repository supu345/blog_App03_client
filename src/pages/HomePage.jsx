import React, { useEffect, useState } from "react";
import { PiGlobeLight } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { motion } from "framer-motion";
import { base_api_url } from "../config/config";
import { Link } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";
import HeaderCategory from "../components/HeaderCategory";
const HomePage = () => {
  const [hovered, setHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("mostPopular");
  const [news, setNews] = useState([]);
  const [newsCate, setNewsCate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("business"); // Initial category

  // Fetch all latest news (if needed)
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

  // Fetch news by selected category
  useEffect(() => {
    const fetchNewsCate = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/all/news`);
        const data = await res.json();
        // console.log("Fetched data:", data);
        setNewsCate(data.news || {}); // Ensure it's an object
      } catch (error) {
        console.error("Error fetching news by category:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchNewsCate();
    }
  }, [category]);
  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="">
      {/* Image Section with Overlaid Content */}

      {news.slice(1, 2).map((item) => (
        <div key={item.id}>
          <div className="relative">
            <img
              src={item.image}
              alt="img"
              className="h-[550px] w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/50 px-4">
              <p className="text-sm font-semibold bg-red-200 text-red-600 p-2 px-2 uppercase rounded-full">
                {item.category}
              </p>
              <p className="text-sm mt-2">
                {moment(item.createdAt).format("MMMM Do, YYYY")}
              </p>
              <Link to={`/news/${item.slug}`}>
                <motion.div
                  className="flex flex-col"
                  onHoverStart={() => setHovered(true)}
                  onHoverEnd={() => setHovered(false)}
                >
                  <p className="text-2xl md:text-4xl font-bold mt-4 cursor-pointer">
                    {item.title}
                  </p>
                  <div
                    className={`border-t-4 border-white transition-all duration-300 ease-in-out ${
                      hovered ? "w-full" : "w-0"
                    }`}
                  ></div>
                </motion.div>
              </Link>

              <p className="text-sm md:text-xl mt-2 leading-relaxed">
                {parse(item.description.slice(0, 100))}
              </p>

              {/* Text Blocks Positioned Over the Image */}
              <div className=" grid sm:grid-cols-2    md:grid-cols-4 gap-4 sm:gap-9 md:gap-9 mt-10">
                {news.slice(2, 6).map((item) => (
                  <div
                    key={item.id}
                    className="bg-red-700 bg-opacity-65 p-3 rounded-lg flex items-center gap-4 w-[300px]  md:w-[300px]"
                  >
                    <div className="h-[60px] w-[90px] rounded-full overflow-hidden">
                      <img
                        src={item.image}
                        alt="image"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Link to={`/news/${item.slug}`}>
                      <p className="text-white font-semibold text-start text-sm md:text-md hover:text-red-400 hover:underline">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Featured Highlights */}

      <div className="mt-[60px] px-4 md:px-12">
        <p className="text-xl md:text-2xl font-bold py-5">
          Featured Highlights
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
          {news.slice(2, 6).map((item) => (
            <div key={item.id}>
              <div className="bg-red-200 rounded-md flex flex-col md:flex-row gap-4 p-4">
                <div className="bg-red-200 rounded-md flex flex-col md:flex-row gap-4 p-4">
                  <div className="w-full md:w-1/2">
                    <img
                      src={item.image}
                      alt="image"
                      className="h-[190px] w-full md:w-[270px] rounded-md object-cover"
                    />
                  </div>
                  <div className="gap-2 w-full md:w-1/2 mt-4 md:mt-[50px]">
                    <div className="flex flex-row gap-2">
                      <p className="bg-slate-50 text-red-500 font-bold p-1 rounded-xl uppercase text-sm">
                        {item.category}
                      </p>
                      <p className="text-gray-700 text-sm">
                        {moment(item.createdAt).format("MMMM Do, YYYY")}
                      </p>
                    </div>
                    <Link to={`/news/${item.slug}`}>
                      <p className="text-lg md:text-2xl font-bold hover:text-red-400 hover:underline">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add*/}

      <div className="mt-[40px]">
        <div className="px-[180px]">
          <div className="bg-slate-400">
            <img
              src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="img"
              className="w-full h-[100px] object-cover opacity-60"
            />
          </div>
        </div>
      </div>
      {/* blog -1*/}
      {/*left*/}
      <div className="bg-pink-300 my-11 p-9 m-11 rounded-md">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Left Column */}
          <div className="sm:w-2/4">
            {news.slice(6, 8).map((item) => (
              <div>
                {" "}
                <div key={item.id}>
                  <div className="mb-9">
                    <div className="bg-white rounded-md flex flex-col sm:flex-row gap-4">
                      <div className="gap-2 sm:w-1/2 mt-[50px] ml-6">
                        <div className="flex flex-row gap-5">
                          <p className="bg-red-100 text-red-500 font-bold p-1 px-2 rounded-xl uppercase text-sm">
                            {item.category}
                          </p>
                          <p>
                            {" "}
                            {moment(item.createdAt).format("MMMM Do, YYYY")}
                          </p>
                        </div>
                        <Link to={`/news/${item.slug}`}>
                          <p className="text-2xl font-bold mb-2 text-black hover:text-red-600 hover:underline">
                            {item.title}
                          </p>
                        </Link>

                        <p className="text-black">
                          {parse(item.description.slice(0, 100))}
                        </p>
                      </div>
                      <div className="sm:w-1/2">
                        <img
                          src={item.image}
                          alt="image"
                          className="h-[350px] w-full rounded-md object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  {/* 2 */}
                </div>{" "}
              </div>
            ))}
          </div>

          {/* Middle Column */}

          <div className="sm:w-2/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {news.slice(8, 12).map((item) => (
                <div key={item.id}>
                  <div className="rounded-md flex flex-col mb-4">
                    <img
                      src={item.image}
                      alt="image"
                      className="h-[200px] w-full rounded-md object-cover"
                    />
                    <div className="gap-2 w-full mt-[50px]">
                      <div className="flex flex-row gap-5">
                        <p className="bg-red-100 text-red-500 font-bold p-1 px-2 rounded-xl uppercase text-sm">
                          {item.category}
                        </p>
                        <p> {moment(item.createdAt).format("MMMM Do, YYYY")}</p>
                      </div>

                      <Link to={`/news/${item.slug}`}>
                        <p className="text-xl font-bold mb-2 hover:text-red-600 hover:underline">
                          {item.title}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* blog -2*/}
      <div className=" my-3  m-11 ">
        {/* blog -2 --LEFT */}

        <p className="text-2xl font-bold py-5">Technology</p>

        <div className="flex flex-col lg:flex-row gap-3">
          {/* blog -2 --LEFT1 */}

          <div className="w-full md:w-2/3">
            <div className="flex flex-col md:flex-row gap-3">
              {/* blog -2 --LEFT1a */}
              {newsCate["Technology"] &&
                newsCate["Technology"]
                  .slice(0, 1) // Select only the first 2 items
                  .map((item, index) => (
                    <div key={index}>
                      <div className="">
                        <div className=" relative">
                          <img
                            src={item.image}
                            alt="img"
                            className="h-[500px] w-[430px] object-cover"
                          />
                          <div className="absolute bottom-0 text-white">
                            <div className="gap-2 mt-[50px] ml-6">
                              <div className="flex flex-row gap-2">
                                {" "}
                                {/* Reduced gap */}
                                <p className="bg-red-100 text-red-500 font-bold p-1 px-2 rounded-xl uppercase text-sm">
                                  {item.category}
                                </p>
                                <p>
                                  {" "}
                                  {moment(item.createdAt).format(
                                    "MMMM Do, YYYY"
                                  )}
                                </p>
                              </div>

                              <Link to={`/news/${item.slug}`}>
                                <p className="text-2xl font-bold mb-6 hover:text-red-600 hover:underline">
                                  {parse(item.description.slice(0, 100))}
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              <div className="sm:w-[500px] md:w-[600px]">
                {/* blog -2 --LEFT1b */}
                <div className="flex flex-col ">
                  {newsCate["Technology"] &&
                    newsCate["Technology"]
                      .slice(1, 5) // Select only the first 2 items
                      .map((item, index) => (
                        <div key={index}>
                          <div className="">
                            {/* Updated width to be consistent */}
                            <div className="flex flex-row gap-2 py-2 px-4">
                              {" "}
                              {/* Reduced gap */}
                              <div className="w-2/3">
                                <Link to={`/news/${item.slug}`}>
                                  <p className="text-lg font-bold hover:text-red-600 hover:underline">
                                    {item.title}
                                  </p>
                                </Link>

                                <p>
                                  {" "}
                                  {moment(item.createdAt).format(
                                    "MMMM Do, YYYY"
                                  )}
                                </p>
                              </div>
                              <div className="w-1/3">
                                <img
                                  src={item.image}
                                  alt="img"
                                  className="h-[100px] w-[180px] object-cover rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>

            {/* blog -2 --LEFT1a--Travel News */}
            <div>
              <p className="text-2xl font-bold mt-11 mb-4"> Travel News</p>
              <div className="flex flex-col md:flex-row gap-6 w-[950px]">
                {/* blog -2 --LEFT1--Travel News */}
                {newsCate["Travel"] &&
                  newsCate["Travel"]
                    .slice(0, 3) // Select only the first 3 items
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex-1 max-w-[300px]" // Ensures consistent width
                      >
                        <div className="rounded-md flex flex-col">
                          {/* Image Section */}
                          <div>
                            <img
                              src={
                                item.image ||
                                "https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                              }
                              alt={item.title || "image"}
                              className="h-[180px] w-full rounded-md object-cover"
                            />
                          </div>
                          {/* Text Section */}
                          <div className="gap-2 w-full mt-[20px]">
                            <div className="flex flex-row gap-5">
                              <p className="bg-red-100 text-red-500 font-bold p-1 px-2 rounded-xl uppercase text-sm">
                                {item.category || "Travel"}
                              </p>
                              <p>
                                {new Date(
                                  item.createdAt
                                ).toLocaleDateString() || "Jan 21, 2025"}
                              </p>
                            </div>

                            <Link to={`/news/${item.slug}`}>
                              <p className="text-xl font-bold my-3 hover:text-red-600 hover:underline">
                                {item.title}
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
            {/* blog -2 --LEFT1--Recent posts */}
            <div>
              <p className="text-2xl font-bold mt-11 mb-4"> Recent posts</p>

              <div className="flex flex-col md:flex-row gap-6 w-[400px] md:w-[950px]">
                {news.slice(8, 11).map((item) => (
                  <div key={item.id}>
                    <div className="">
                      {/* blog -2 --LEFT1--Recent posts */}

                      <div className="  rounded-md flex flex-col  ">
                        <div className="">
                          <img
                            src={item.image}
                            alt="image"
                            className="h-[250px] w-full rounded-md  object-cover"
                          />
                        </div>
                        <div className=" gap-2 w-full mt-[20px] ">
                          <div className="flex flex-row gap-5">
                            <p className="bg-red-100 text-red-500 font-bold p-1 px-2 rounded-xl uppercase text-sm">
                              {item.category}1
                            </p>
                            <p>
                              {moment(item.createdAt).format("MMMM Do, YYYY")}
                            </p>
                          </div>

                          <Link to={`/news/${item.slug}`}>
                            <p className="text-xl font-bold mb-4 hover:text-red-600 hover:underline">
                              {item.title}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-6 w-[400px] md:w-[950px]">
                {news.slice(12, 15).map((item) => (
                  <div key={item.id} className="flex-1">
                    <div className="rounded-md flex flex-col h-full">
                      <div className="h-[250px] w-full">
                        <img
                          src={item.image}
                          alt="image"
                          className="h-full w-full rounded-md object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full mt-[20px] flex-grow">
                        <div className="flex flex-row gap-5">
                          <p className="bg-red-100 text-red-500 font-bold p-1 px-2 rounded-xl uppercase text-sm">
                            {item.category}
                          </p>
                          <p>
                            {moment(item.createdAt).format("MMMM Do, YYYY")}
                          </p>
                        </div>

                        <Link to={`/news/${item.slug}`}>
                          <p className="text-xl font-bold mb-4 hover:text-red-600 hover:underline">
                            {item.title}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div>
                <button className="px-[380px] mt-6 ">
                  <p className="bg-red-200 p-2 px-3 text-red-700 font-bold">
                    More Posts
                  </p>
                </button>
              </div> */}
            </div>
            {/* blog -2 --LEFT1--Recent posts */}

            <div className=" mt-8">
              <p className="text-2xl font-bold mt-11 mb-4">Sport News</p>
              {/* blog -2 -Sports */}
              {newsCate["Sports"] &&
                newsCate["Sports"]
                  .slice(1, 2) // Select only the first 3 items
                  .map((item, index) => (
                    <div key={index}>
                      <div className="flex flex-col sm:flex-row bg-blue-500">
                        <div className="w-full sm:w-1/2 ">
                          <img src={item.image} alt="image" />
                        </div>
                        <div className="w-1/2 sm:w-1/2 bg-blue-500 ">
                          <div className=" gap-2  mt-[60px] mx-8 w-[440px] ">
                            <div className="flex flex-row gap-5 mb-3 ">
                              <p className="bg-red-100 text-red-500 font-bold p-1 px-2 rounded-xl uppercase text-sm">
                                {item.category}
                              </p>
                              {moment(item.createdAt).format("MMMM Do, YYYY")}
                            </div>

                            <Link to={`/news/${item.slug}`}>
                              <p className="text-xl text-gray-100 font-bold mb-3 hover:text-red-600 hover:underline">
                                {item.title}
                              </p>
                            </Link>

                            <p className="text-gray-900">
                              {parse(item.description.slice(0, 200))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

              {/* blog -2 -Sports1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6 ">
                {/* blog -2 --LEFT1--Travel News */}

                {newsCate["Sports"] &&
                  newsCate["Sports"]
                    .slice(1, 5) // Select only the first 3 items
                    .map((item, index) => (
                      <div key={index}>
                        <div className="w-full ">
                          <div className="">
                            <div className="  rounded-md flex flex-col  ">
                              <div className="">
                                <img
                                  src={item.image}
                                  alt="image"
                                  className="h-[180px] w-full rounded-md  object-cover"
                                />
                              </div>
                              <div className=" gap-2 w-full mt-[20px] ">
                                <div className="flex flex-row gap-5">
                                  <p className="bg-red-100 text-red-500 font-bold p-1 px-2 rounded-xl uppercase text-sm">
                                    {item.category}
                                  </p>
                                  <p>
                                    {moment(item.createdAt).format(
                                      "MMMM Do, YYYY"
                                    )}
                                  </p>
                                </div>

                                <Link to={`/news/${item.slug}`}>
                                  <p className="text-xl font-bold mb-2 hover:text-red-600 hover:underline">
                                    {item.title}
                                  </p>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {/* blog -2 --RIGHT1 */}
          <div className="w-full md:w-1/3">
            <p className="text-3xl font-bold "> Social Counter</p>
            {/* blog -2 --RIGHT Social Counter */}
            <div>
              <div className="flex flex-row gap-2 ">
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <PiGlobeLight className="bg-red-500 text-4xl text-white rounded-full p-1 m-2" />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <FaFacebookF
                    className="bg-blue-600 text-4xl text-white
                rounded-full p-2 m-2"
                  />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 ">
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <IoLogoInstagram className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-4xl text-white rounded-full p-1 m-2" />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <FaLinkedinIn
                    className="bg-blue-500 text-4xl text-white
                rounded-full p-1 m-2"
                  />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-2 ">
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <FaXTwitter className="bg-black text-4xl text-white rounded-full p-1 m-2" />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <FaYoutube className="bg-red-600 text-4xl text-white rounded-full p-2 m-2 " />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
              </div>
            </div>
            {/* blog -2 --RIGHT Daily News */}
            <div>
              <p className="text-2xl font-bold  mt-5 ml-3"> Daily News</p>

              {news.slice(15, 18).map((item) => (
                <div key={item.id} className="w-full">
                  <div className="flex flex-row gap-4 py-2 px-4 items-center">
                    {/* Left - Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt="img"
                        className="h-[100px] w-[160px] object-cover rounded-md"
                      />
                    </div>

                    {/* Right - Content */}
                    <div className="flex flex-col justify-between h-[100px]">
                      <Link to={`/news/${item.slug}`}>
                        <p className="text-lg font-bold line-clamp-2 hover:text-red-600 hover:underline">
                          {item.title}
                        </p>
                      </Link>
                      <p className="text-sm text-gray-500">
                        {moment(item.createdAt).format("MMMM Do, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* blog -2 --Top Categories */}

            <div className="ml-8">
              <p className="text-2xl font-bold mt-5 mb-4 "> News Category</p>

              <HeaderCategory />
            </div>

            {/* blog -2 --Training */}
            <div className="ml-5 mt-12">
              <p className="text-2xl font-bold mt-5 mb-4 ">Training </p>

              {news.slice(18, 19).map((item) => (
                <div key={item.id}>
                  <div className="p-3 relative">
                    <img src={item.image} alt="image" className="rounded-md " />

                    <div className="absolute inset-0 flex flex-col mt-[120px] mx-4 text-white text-center  px-4">
                      <div className="flex flex-row gap-5  ">
                        <p className="text-sm font-semibold bg-red-200 text-start  text-red-600 p-2 px-2 uppercase rounded-full">
                          {item.category}
                        </p>
                        <p>{moment(item.createdAt).format("MMMM Do, YYYY")}</p>
                      </div>

                      <Link to={`/news/${item.slug}`}>
                        <p className="text-xl font-bold mt-4 leading-tight text-start text-white hover:text-red-600 hover:underline">
                          {item.title}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {newsCate["Food"] &&
                newsCate["Food"]
                  .slice(0, 3) // Select only the first 3 items
                  .map((item, index) => (
                    <div key={index} className="w-full">
                      <div className="flex flex-row gap-4 py-3 px-4 items-center">
                        {/* Left - Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt="img"
                            className="h-[100px] w-[160px] object-cover rounded-md"
                          />
                        </div>

                        {/* Right - Content */}
                        <div className="flex flex-col justify-between h-[100px] w-full">
                          <Link to={`/news/${item.slug}`}>
                            <p className="text-lg font-bold leading-tight text-start text-black hover:text-red-600 hover:underline line-clamp-2">
                              {item.title}
                            </p>
                          </Link>
                          <p className="text-sm text-gray-500">
                            {moment(item.createdAt).format("MMMM Do, YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* blog -2 --add 2 */}

            <div className="p-3 px-5 sticky top-0 ">
              {/* <p className="text-2xl font-bold mt-5 ml-3">Advertisement</p> */}
              <img
                src="https://images.pexels.com/photos/30304032/pexels-photo-30304032/free-photo-of-frankfurt-skyscrapers-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
                className="h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
        {/**Technology */}
      </div>

      {/* blog -2 --Gallery */}

      <div className="bg-red-600  mt-9 px-[50px] py-4">
        <p className="text-2xl font-bold py-8 text-white mt-[40px] pt-5">
          Gallery
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-2/3 ">
            {newsCate["Environment"] &&
              newsCate["Environment"]
                .slice(0, 1) // Select only the first 3 items
                .map((item, index) => (
                  <div key={index}>
                    <div className="p-3 relative">
                      <img
                        src={item.image}
                        alt="image"
                        className="rounded-md "
                      />

                      <div className="absolute bottom-0 text-white">
                        <div className="gap-2 mt-[50px] ml-6">
                          <div className="flex flex-row gap-2">
                            {" "}
                            {/* Reduced gap */}
                            <p className="bg-red-200 text-red-500 font-bold p-1 px-2 rounded-xl uppercase text-sm">
                              {item.category}
                            </p>
                            <p className="text-slate-900  ">
                              {" "}
                              {moment(item.createdAt).format("MMMM Do, YYYY")}
                            </p>
                          </div>

                          <Link to={`/news/${item.slug}`}>
                            <p className="text-2xl md:text-4xl my-4 font-bold mb-12 mr -12 text-slate-200  r- bg-gradient-to-b hover:text-red-600 hover:underline line-clamp-2">
                              {item.title}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          <div className=" w-full sm:w-1/3 m-3 text-white p-[2px] bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-md">
            <div className="bg-red-900 w-full h-full rounded-md p-3">
              {newsCate["Entertaintment"] &&
                newsCate["Entertaintment"]
                  .slice(0, 5) // Select only the first 5 items
                  .map((item, index) => (
                    <div key={index} className="">
                      <div className="flex flex-row gap-4 py-3 px-4 items-center">
                        {/* Left - Category and Title */}
                        <div className="flex flex-col justify-between">
                          <p className="text-sm font-semibold text-gray-200  uppercase p-2">
                            {item.category}
                          </p>
                          <Link to={`/news/${item.slug}`}>
                            <p className="text-lg font-bold hover:text-red-400 hover:underline line-clamp-2">
                              {item.title}
                            </p>
                          </Link>
                        </div>

                        {/* Right - Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt="img"
                            className="h-[100px] w-[150px] object-cover rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* blog -3 --Block 5 */}

      <div className="mt-9 flex flex-col sm:flex-row gap-6 px-4 sm:px-9">
        {/* Blog Block Left */}
        <div className="w-full sm:w-1/3">
          <div className="ml-0 sm:ml-5 mt-12">
            <p className="text-2xl font-bold mt-5 mb-4">Business</p>

            {newsCate["Business"] &&
              newsCate["Business"]
                .slice(0, 1) // Select only the first 3 items
                .map((item, index) => (
                  <div key={index}>
                    <div className="p-3 relative">
                      <img
                        src={item.image}
                        alt="image"
                        className="rounded-md"
                      />
                      <div className="absolute inset-0 flex flex-col mt-[120px] mx-4 text-black text-center px-4">
                        <div className="flex flex-row gap-5">
                          <p className="text-sm font-semibold bg-red-200 text-start text-red-600 p-2 px-2 uppercase rounded-full">
                            {item.category}
                          </p>
                          <p className="text-sm mt-2 text-white">
                            {moment(item.createdAt).format("MMMM Do, YYYY")}
                          </p>
                        </div>

                        <Link to={`/news/${item.slug}`}>
                          <p className="text-xl font-bold text-white  mt-4 leading-tight text-start hover:text-red-400 hover:underline line-clamp-2">
                            {item.title}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

            {newsCate["Business"] &&
              newsCate["Business"]
                .slice(1, 4) // Select only the first 3 items
                .map((item, index) => (
                  <div key={index}>
                    <div key={index} className="flex flex-row gap-2 py-3 px-4">
                      <div>
                        <img
                          src={item.image}
                          alt="img"
                          className="h-[100px] w-[180px] object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <Link to={`/news/${item.slug}`}>
                          <p className="text-lg font-bold mt-4 leading-tight text-start hover:text-red-400 hover:underline line-clamp-2">
                            {item.title}
                          </p>
                        </Link>

                        <p>{moment(item.createdAt).format("MMMM Do, YYYY")}</p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Blog Block Middle */}
        <div className="w-full sm:w-1/3">
          <div className="mt-5 sm:mt-[110px] h-[500px]">
            <img
              src="https://images.pexels.com/photos/30228470/pexels-photo-30228470/free-photo-of-empire-state-building-framed-by-manhattan-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="image"
              className="rounded-3xl"
            />
          </div>
        </div>

        {/* Blog Block Right */}
        <div className="w-full sm:w-1/3">
          <div className="ml-0 sm:ml-5 mt-12">
            <p className="text-2xl font-bold mt-5 mb-4">Finance</p>
            {newsCate["Finance"] &&
              newsCate["Finance"]
                .slice(0, 1) // Select only the first 3 items
                .map((item, index) => (
                  <div key={index}>
                    <div className="p-3 relative">
                      <img
                        src={item.image}
                        alt="image"
                        className="rounded-md"
                      />
                      <div className="absolute inset-0 flex flex-col mt-[120px] mx-4 text-black text-center px-4">
                        <div className="flex flex-row gap-5">
                          <p className="text-sm font-semibold bg-red-200 text-start text-red-600 p-2 px-2 uppercase rounded-full">
                            {item.category}
                          </p>
                          <p className="text-sm mt-2 text-white">
                            {moment(item.createdAt).format("MMMM Do, YYYY")}
                          </p>
                        </div>

                        <Link to={`/news/${item.slug}`}>
                          <p className="text-xl font-bold text-white  mt-4 leading-tight text-start hover:text-red-400 hover:underline line-clamp-2">
                            {item.title}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            {newsCate["Finance"] &&
              newsCate["Finance"]
                .slice(1, 4) // Select only the first 3 items
                .map((item, index) => (
                  <div key={index}>
                    <div key={index} className="flex flex-row gap-2 py-3 px-4">
                      <div>
                        <img
                          src={item.image}
                          alt="img"
                          className="h-[100px] w-[180px] object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <Link to={`/news/${item.slug}`}>
                          <p className="text-lg font-bold mt-4 leading-tight text-start hover:text-red-400 hover:underline line-clamp-2">
                            {item.title}
                          </p>
                        </Link>

                        <p>{moment(item.createdAt).format("MMMM Do, YYYY")}</p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* blog -3 --Food */}

      <div className="mt-[160px] px-4 ">
        <p className="text-2xl font-bold  mt-5 ml-[50px]"> Food </p>

        {/* blog -1*/}
        {/*left*/}
        <div className=" bg-purple-300 my-11 p-9 m-11 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {newsCate["Food"] &&
              newsCate["Food"]
                .slice(0, 4) // Select only the first 4 items
                .map((item, index) => (
                  <div key={index} className="bg-white rounded-md shadow-md">
                    <div className="overflow-hidden rounded-t-md">
                      <img
                        src={item.image}
                        alt={item.title || "Food Image"}
                        className="h-[250px] w-full rounded-t-md object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex flex-row justify-between items-center mb-2">
                        <p className="bg-red-100 text-red-500 font-bold p-1 px-2 rounded-xl uppercase text-sm">
                          {item.category}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {moment(item.createdAt).format("MMMM Do, YYYY")}
                        </p>
                      </div>

                      <Link to={`/news/${item.slug}`}>
                        <p className="text-lg font-bold mb-4 hover:text-red-400 hover:underline line-clamp-2">
                          {item.title}
                        </p>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
