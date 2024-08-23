import React, { SyntheticEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("");

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    setSearchText(searchQuery);
    const searchCategoryQuery = searchParams.get("category") || "";
    setSearchCategory(searchCategoryQuery);
  }, [searchParams]);

  let page = parseInt(searchParams.get("page") || "1", 10);

  if (isNaN(page)) {
    page = 1;
  }

  if (page < 1) {
    page = 1;
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  const handleNextPage = () => {
    searchParams.set("page", `${page + 1}`);
    setSearchParams(searchParams);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      searchParams.set("page", `${page - 1}`);
      setSearchParams(searchParams);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleInputChangeCategory = (
    _event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value !== null) {
      setSearchCategory(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchText.trim() === "") {
        searchParams.delete("search");
      } else {
        searchParams.set("search", searchText.trim());
        searchParams.set("page", "1"); // enter push page = 0 to url
      }
      setSearchParams(searchParams);
    }
  };

  const handleKeyDownInputCategory = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (searchCategory.trim() === "") {
        searchParams.delete("category");
      } else {
        searchParams.set("category", searchCategory.trim());
        searchParams.set("page", "1"); // enter push page = 0 to url
      }
      setSearchParams(searchParams);
    }
  };

  return {
    searchText,
    searchCategory,
    handleInputChange,
    handleInputChangeCategory,
    handleKeyDown,
    handleKeyDownInputCategory,
    handleNextPage,
    handlePrevPage,
    page,
  };
};

export default useSearchQuery;
