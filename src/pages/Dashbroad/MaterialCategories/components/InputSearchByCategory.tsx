import { GoSearch } from "react-icons/go";
// mui
import { Box, InputAdornment, InputBase } from "@mui/material";
// hooks
import useSearchQuery from "@/hooks/useSearchQuery";

const InputSearchByCategory = () => {
  const {
    searchCategory,
    handleInputChangeCategory,
    handleKeyDownInputCategory,
  } = useSearchQuery();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "8px 0",
      }}
    >
      <InputBase
        placeholder="Search category"
        value={searchCategory}
        onChange={handleInputChangeCategory}
        onKeyDown={handleKeyDownInputCategory}
        sx={{
          width: "320px",
          height: "32px",
          borderRadius: "25px",
          paddingLeft: "8px",
          color: "#94A3B8",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
        className="bg-white"
        startAdornment={
          <InputAdornment position="start">
            <GoSearch style={{ color: "#94A3B8" }} />
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default InputSearchByCategory;
