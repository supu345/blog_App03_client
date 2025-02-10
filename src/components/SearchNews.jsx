import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base_api_url } from "../config/config";

const SearchNews = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const { value } = useParams();

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
    console.log("Value from useParams:", value); // Debugging
    if (value) {
      getNews();
    }
  }, [value]);

  if (!value) {
    return <p>Please enter a search term.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search Results for "{value}"</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-md hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <img src={item.image} alt="image" />
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No news found for "{value}".</p>
      )}
    </div>
  );
};

export default SearchNews;
