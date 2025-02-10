import { AiOutlineSearch } from "react-icons/ai";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [state, setState] = useState(""); // State for search input
  const navigate = useNavigate(); // Hook for navigation

  // Search handler
  const search = (e) => {
    e.preventDefault();
    if (state.trim()) {
      navigate("/");
      navigate(`/search/news?value=${state}`);
      setState(""); // Clear the search field
    }
  };

  return (
    <div className="p-4">
      <form className="flex" onSubmit={search}>
        {/* Search Input */}
        <div className="w-[calc(100%-45px)] h-[45px]">
          <input
            type="text"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full h-full p-2 border border-gray-300 outline-none text-black bg-slate-100"
            placeholder="Search..."
          />
        </div>
        {/* Search Button */}
        <button
          type="submit"
          className="w-[45px] h-[45px] flex justify-center items-center bg-red-600 hover:bg-red-700 text-white text-xl"
        >
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
