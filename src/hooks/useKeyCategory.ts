import * as React from "react";

// hook
import useSearchQuery from "@/hooks/useSearchQuery";

export const useGetUrlCategory = () => {
  const { searchText, page } = useSearchQuery();

  const url = React.useMemo(() => {
    const limit = 5;
    const offset = (page - 1) * limit;
    const encodedSearchText = searchText ? encodeURIComponent(searchText) : "";
    const finalUrl = `/api/cms/material_categories?name=${encodedSearchText}&page=${page}&limit=${limit}&offset=${offset}`;
    return finalUrl;
  }, [searchText, page]);

  return {
    url,
  };
};
