import { SyntheticEvent } from "react";
// HOC
import { WithCategoriesProps } from "@/hoc/type";
import withGetCategories from "@/hoc/withGetCategories";
// hooks
import useSearchQuery from "@/hooks/useSearchQuery";
// mui
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// eslint-disable-next-line react-refresh/only-export-components
const SearchByCategory = ({
  categories,
  loading,
  errors,
}: WithCategoriesProps) => {
  const categoriesName = categories.map((category) => category.name);
  const {
    searchCategory,
    handleInputChangeCategory,
    handleKeyDownInputCategory,
  } = useSearchQuery();

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={categoriesName}
      className="shadow-shadowInput"
      sx={{
        width: 300,
        backgroundColor: "white",
        borderRadius: 999,
        "& .MuiOutlinedInput-root": {
          height: 32,
          paddingLeft: 1,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
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
          placeholder="Search Category"
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
