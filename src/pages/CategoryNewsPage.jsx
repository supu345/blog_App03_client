import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { base_api_url } from "../config/config";
import parse from "html-react-parser";
import RecentNews from "../components/RecentNews";
import Search from "../components/Search";
import PopularNews from "../components/PopularNews";
import HeaderCategory from "../components/HeaderCategory";
import DailyNews from "../components/DailyNews";
import { PiGlobeLight } from "react-icons/pi";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";

const CategoryNewsPage = () => {
  const { category } = useParams(); // Extract the category from the URL

  const [news, setNews] = useState([]); // State to hold news data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages

  const normalizedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : "";

  const loadMoreNews = () => {
    if (page < totalPages && !loading) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true); // Start loading for the next page
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${base_api_url}/api/category/news/${normalizedCategory}?page=${page}&limit=4`
        );
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNews((prevNews) => [...prevNews, ...(data.news || [])]);
        setTotalPages(data.pagination.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Ensure loading stops
      }
    };

    if (normalizedCategory) {
      fetchNews();
    }
  }, [normalizedCategory, page]);

  return (
    <div className="px-8 py-4 mt-[100px]">
      <Breadcrumb one="category" two={category} />
      <div className="flex flex-row gap-4">
        <div className="w-2/3">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-2 gap-8">
              {news.map((item, index) => (
                <div key={index} className="py-5 mb-3">
                  <img
                    src={item.image} // Ensure this is the correct path to your image
                    alt={item.title}
                    className="h-[300px] w-[450px] object-cover"
                  />
                  <p className="text-2xl mt-2 font-semibold">{item.title}</p>
                  <p className="text-gray-700 mt-2">
                    {" "}
                    {parse(item.description.slice(0, 100))}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No news found for this category.</p>
          )}

          {page < totalPages && (
            <button
              onClick={loadMoreNews}
              disabled={loading}
              className="bg-green-500 p-2 mb-4"
            >
              {loading ? "Loading..." : "Read More"}
            </button>
          )}
        </div>
        <div className="w-1/3">
          <Search />

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
              <p className="text-2xl font-bold mt-5 mb-4 "> News Categories</p>
              <HeaderCategory />
            </div>
          </div>
        </div>
      </div>

      <div>
        <PopularNews />
      </div>
    </div>
  );
};

export default CategoryNewsPage;
