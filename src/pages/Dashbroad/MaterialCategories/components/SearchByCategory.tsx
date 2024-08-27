import { WithCategoriesProps } from "@/hoc/type";
import withGetCategories from "@/hoc/withGetCategories";
import useSearchQuery from "@/hooks/useSearchQuery";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const SearchByCategory = ({
  categories,
  loading,
  errors,
}: WithCategoriesProps) => {
  console.log("loading", loading);
  console.log("errors", errors);
  const categoriesName = categories.map((category) => category.name);
  const {
    searchCategory,
    handleInputChangeCategory,
    handleKeyDownInputCategory,
  } = useSearchQuery();

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={categoriesName}
      sx={{
        width: 300,
        height: 40,
        backgroundColor: "white",
        "& .MuiOutlinedInput-root": {
          height: 40,
          padding: 0,
        },
        "& .MuiInputLabel-root": {
          position: "absolute",
          top: "-6px",
        },
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
      }}
      value={searchCategory}
      onChange={(
        event: SyntheticEvent<Element, Event>,
        value: string | null
      ) => {
        handleInputChangeCategory(event, value);
      }}
      onInputChange={(
        event: SyntheticEvent<Element, Event>,
        value: string | null
      ) => {
        handleInputChangeCategory(event, value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          sx={{ height: 40 }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDownInputCategory(event)
          }
        />
      )}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default withGetCategories(SearchByCategory);
