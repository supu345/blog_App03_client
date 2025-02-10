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
import HeaderCategory from "../components/HeaderCategory";

const DetailsPage = () => {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  const [newss, setNewss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsDaily, setNewsDaily] = useState([]);
  // Fetch all latest news (if needed)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/news/details/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch news details");
        const { news } = await res.json();
        setNews(news);
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching news details.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [slug]);

  return (
    <div className="mt-[80px] ml-[30px] ">
      <div className="py-4">
        <Breadcrumb one="category" two={slug} />
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full  md:w-2/3">
          {news ? (
            <div>
              <Link to={`/news/${item.slug}`}>
                <p className="text-3xl font-bold mb-5  hover:text-red-400 hover:underline">
                  {news.title}
                </p>
              </Link>

              <img
                src={news.image}
                alt="img"
                className="h-[400px] w-full object-cover mb-5 rounded-md"
              />
              <p>
                {news.description
                  ? parse(news.description)
                  : "No description available."}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          {/* 2nd part */}
          <div>
            <p className="font-bold text-xl"> You may like these posts</p>
            <RecentNews />
          </div>
        </div>
        <div className="w-full md:w-1/3 mr-4">
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
            <p className="text-2xl font-bold mt-5 mb-4 "> News Categories</p>
            <HeaderCategory />
          </div>
        </div>
      </div>

      {/* blog -3 --Don't Miss */}

      <PopularNews />
    </div>
  );
};

export default DetailsPage;
