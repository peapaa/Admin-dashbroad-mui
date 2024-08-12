import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSearchQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";
    setSearchText(searchQuery);
  }, [location.search]);

  const queryPageParams = new URLSearchParams(location.search);
  let page = parseInt(queryPageParams.get("page") || "1", 10);
  if (page < 1) {
    page = 1;
    queryPageParams.set("page", "1");
    navigate(`${location.pathname}?${queryPageParams.toString()}`, {
      replace: true,
    });
  }

  const handleNextPage = () => {
    queryPageParams.set("page", `${page + 1}`);
    navigate(`${location.pathname}?${queryPageParams.toString()}`, {
      replace: true,
    });
  };

  const handlePrevPage = () => {
    // Đảm bảo page không âm
    if (page > 0) {
      queryPageParams.set("page", `${page - 1}`);
      navigate(`${location.pathname}?${queryPageParams.toString()}`, {
        replace: true,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newSearchParams = new URLSearchParams(location.search);
      if (searchText.trim() === "") {
        newSearchParams.delete("search");
      } else {
        newSearchParams.set("search", searchText.trim());
        newSearchParams.set("page", "1"); // enter push page = 0 to url
      }

      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    }
  };
  return {
    searchText,
    handleInputChange,
    handleKeyDown,
    handleNextPage,
    handlePrevPage,
    page,
  };
};

export default useSearchQuery;
