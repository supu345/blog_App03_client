import React, { useEffect, useState } from "react";
import { base_api_url } from "../config/config";
import { Link } from "react-router-dom";

const PopularNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/popular/news`);
        const data = await res.json();
        setNews(data.popularNews || []);
        //console.log("Fetched popular news:", data.popularNews);
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
      <div className="px-6 pb-8 mt-5">
        <div className="flex flex-col w-full gap-y-[14px]">
          <p className="pl-4 text-2xl font-bold">Popular news</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 sm:gap-3 lg:gap-x-4">
            {news.length > 0 ? (
              news.map((item) => (
                <div key={item._id} className="flex flex-col items-start">
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[200px] w-full max-w-[350px] object-cover rounded-md"
                  />
                  <p className="bg-red-100 text-red-500 font-bold p-1 px-2 mt-4 rounded-xl uppercase text-sm max-w-[150px] text-center truncate">
                    {item.category}
                  </p>
                  <Link to={`/news/${item.slug}`}>
                    <p className="text-xl mt-5 font-semibold hover:text-red-400 hover:underline line-clamp-2">
                      {item.title}
                    </p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No popular news available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
