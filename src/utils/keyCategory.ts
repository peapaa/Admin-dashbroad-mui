export const getCategoriesKey = (searchText: string, page: number) => [
  "/api/cms/material_categories",
  searchText,
  page,
];
