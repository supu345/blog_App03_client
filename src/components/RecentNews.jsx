import React, { useEffect, useState } from "react";
import { base_api_url } from "../config/config";
import { Link } from "react-router-dom";

const RecentNews = () => {
  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch all latest news (if needed)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/recent/news`);
        const { news } = await res.json();
        setNews(news);
        //  console.log("Fetched recent news:", news);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  return (
    <div className="w-full  gap-y-[14px] bg-white pt-4">
      <div className="pl-4 text-2xl font-bold">Recent news</div>
      <div className="grid  grid-cols-1 md:grid-cols-2  gap-y-1">
        {news.slice(0, 6).map((item) => (
          <div key={item.id}>
            <div className="bg-white shadow flex p-4">
              <div className="relative group overflow-hidden h-full">
                <div className="group-hover:scale-[1.1] transition-all duration-[1s] w-[100px] md:w-[160px] h-[93px] lg:w-[100px] relative">
                  <img
                    className=""
                    layout="fill"
                    src={item.image}
                    alt="images"
                  />
                  <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
                </div>
              </div>
              <div className="flex flex-col gap-y-1 w-[calc(100%-100px)] md:w-[calc(100%-160px)] lg:w-[calc(100%-100px)] pl-3">
                <Link
                  href={`/news/category/${item?.category}`}
                  className="text-sm font-semibold text-[#c80000]"
                >
                  {item?.category}
                </Link>

                <Link
                  to={`/news/${item.slug}`}
                  className="text-sm font-semibold text-[#333333]
                  hover:text-[#c80000]"
                >
                  {item?.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNews;
