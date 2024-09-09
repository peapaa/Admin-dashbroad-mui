// HOC
import { WithCategoriesProps } from "@/hoc/type";
import withGetCategories from "@/hoc/withGetCategories";
// hooks
// mui
import { InputSearchProps } from "@/pages/Dashbroad/Categories/type";
import { InputAdornment } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent } from "react";
import { GoSearch } from "react-icons/go";

// eslint-disable-next-line react-refresh/only-export-components
const SearchByCategory = ({
  categories,
  loading,
  errors,
  value,
  onChange,
}: WithCategoriesProps & InputSearchProps) => {
  const categoriesName = categories.map((category) => category.name);
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
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
      value={value}
      onChange={(_: SyntheticEvent<Element, Event>, value: string | null) => {
        if (value) {
          onChange(value);
        }
      }}
      onInputChange={(
        _: SyntheticEvent<Element, Event>,
        value: string | null
      ) => {
        if (value) {
          onChange(value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Category"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <GoSearch style={{ color: "#94A3B8" }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default withGetCategories(SearchByCategory);
