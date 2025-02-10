import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import SearchNews from "../components/SearchNews";
import { Link, useSearchParams } from "react-router-dom";
import { base_api_url } from "../config/config";
import PopularNews from "../components/PopularNews";
import HeaderCategory from "../components/HeaderCategory";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { PiGlobeLight } from "react-icons/pi";
import DailyNews from "../components/DailyNews";

const SearchPage = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const value = searchParams.get("value"); // Extract the 'value' query parameter

  const getNews = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/search/news?value=${value}`);
      if (!res.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await res.json();
      setNews(data.news || []);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching news:", error.message);
      setError("Failed to load news. Please try again later.");
    }
  };

  useEffect(() => {
    console.log("Query parameter 'value':", value); // Debugging
    if (value) {
      getNews();
    }
  }, [value]);

  if (!value) {
    return (
      <p>
        Please enter a search term in the query parameter (e.g.,
        ?value=artificial).
      </p>
    );
  }

  return (
    <div>
      <div className="mt-[100px]">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="category" two={"search news"} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full  md:w-2/3">
          <div className="w-full pr-0 xl:pr-4">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : news.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {news.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md p-4 rounded-lg flex flex-col"
                  >
                    <img
                      src={item.image}
                      alt="News"
                      className="w-full h-60 object-cover rounded-md mb-4"
                    />
                    <Link to={`/news/${item.slug}`}>
                      <h2 className="text-lg font-semibold hover:text-red-400 hover:underline">
                        {item.title}
                      </h2>
                    </Link>

                    <p className="text-sm text-gray-600 mt-4">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No news found for "{value}".</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/3 mr-4">
          <p className="text-2xl font-bold "> Follow Us</p>

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
      <PopularNews />
    </div>
  );
};

export default SearchPage;
