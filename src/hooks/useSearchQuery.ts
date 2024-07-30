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
      }

      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    }
  };
  return {
    searchText,
    handleInputChange,
    handleKeyDown,
  };
};

export default useSearchQuery;
