import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { base_api_url } from "../config/config";
import parse from "html-react-parser";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { PiGlobeLight } from "react-icons/pi";
import Search from "../components/Search";
import moment from "moment";
import DailyNews from "../components/DailyNews";
import PopularNews from "../components/PopularNews";
import RecentNews from "../components/RecentNews";
import { Link } from "react-router-dom";

const BlogsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div>
      <div className="flex md:flex-row flex-col mt-[100px] gap-4  px-9">
        {/*left */}
        <div className=" ">
          <div className="mr-4">
            <p className="text-2xl font-bold "> Follow Us</p>

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

              <DailyNews />
            </div>

            {/* blog -2 --Top Categories */}

            <div className="ml-5">
              <p className="text-2xl font-bold mt-5 mb-4 "> Social Counter</p>

              <div className="flex flex-row justify-between bg-slate-200 px-9 py-6 rounded-lg mb-4">
                <p className="font-bold">Business</p>
                <p className="bg-slate-300 p-1 px-2 text-red-400 font-bold">
                  5
                </p>
              </div>
              <div className="flex flex-row justify-between bg-slate-200 px-9 py-6 rounded-lg mb-4">
                <p className="font-bold">LifeStyle</p>
                <p className="bg-slate-300 p-1 px-2 text-red-400 font-bold">
                  5
                </p>
              </div>
              <div className="flex flex-row justify-between bg-slate-200 px-9 py-6 rounded-lg mb-4">
                <p className="font-bold">Travel</p>
                <p className="bg-slate-300 p-1 px-2 text-red-400 font-bold">
                  5
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*Right */}
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-9">
            {news.slice(1, 7).map((item) => (
              <div key={item.id} className="bg-white rounded-md shadow-md">
                <div className="overflow-hidden rounded-t-md">
                  <img
                    src={item.image}
                    alt={item.title || "Food Image"}
                    className="h-[300px] w-full rounded-t-md object-cover"
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

                  <p> {parse(item.description.slice(0, 100))}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" bg-purple-300 my-11 p-9 m-11 rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {news.slice(1, 5).map((item) => (
            <div key={item.id} className="bg-white rounded-md shadow-md">
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
  );
};

export default BlogsPage;
