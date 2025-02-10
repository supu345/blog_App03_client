import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineDown } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { base_api_url } from "../config/config";

const HeaderCategory = () => {
  const [show, setShow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categories, setCategories] = useState([]); // Re-enable this state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Function to fetch categories
  const getCategories = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/category/all`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
     // console.log("Fetched Categories:", data); // Debugging
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    getCategories();
  }, []);

  // Search function
  const search = (e) => {
    e.preventDefault();
    navigate(`/search/news?value=${searchQuery}`);
    setSearchQuery("");
    setShow(false);
  };

  // Toggle dropdown for categories with subcategories
  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="">
      <div className="text-black font-semibold relative">
        <div className="px-4 items-center relative">
          {/* Categories Navigation */}
          <div className="hidden lg:flex flex-wrap justify-start gap-4 ">
            {" "}
            {/* Use flex-wrap and gap */}
            <div className="mt-3 ml-3 ">
              <Link to="/">Home</Link>
            </div>
            {categories.length > 0 ? (
              categories.map((categoryItem, index) => (
                <div
                  key={index}
                  className="relative group flex-1 min-w-[calc(25%-1rem)]"
                >
                  {" "}
                  {/* 25% width, flex-wrap */}
                  <Link
                    className={`px-4  font-medium py-[13px] flex items-center `}
                    to={`/category/news/${categoryItem.category.toLowerCase()}`}
                  >
                    {categoryItem.category}
                  </Link>
                </div>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCategory;
