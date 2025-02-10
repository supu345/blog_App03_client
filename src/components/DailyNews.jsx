import React, { useEffect, useState } from "react";
import { base_api_url } from "../config/config";
import { Link } from "react-router-dom";
import moment from "moment";
const DailyNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/latest/news`);
        const { news } = await res.json();
        setNews(news);
        console.log("Fetched newsD:", news);
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
      {" "}
      {news.slice(15, 18).map((item) => (
        <div key={item.id}>
          <div className="flex flex-row gap-2 py-2 px-4">
            {/*left */}

            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt="img"
                className="h-[100px] w-[150px] object-cover rounded-md"
              />
            </div>
            <div className="">
              <Link to={`/news/${item.slug}`}>
                <p className="text-lg font-bold hover:text-red-400 hover:underline line-clamp-2">
                  {item.title.slice(0, 50)}
                </p>
              </Link>

              <p>{moment(item.createdAt).format("MMMM Do, YYYY")}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyNews;
