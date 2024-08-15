import * as React from "react";

// hook
import useSearchQuery from "../hooks/useSearchQuery";

export const GetKeyUrlCategory = () => {
  const { searchText, page } = useSearchQuery();
  return React.useMemo(
    () => ["/api/cms/material_categories", searchText, page],
    [searchText, page]
  );
};
