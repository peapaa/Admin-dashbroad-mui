// mui
import { Box, InputAdornment, InputBase } from "@mui/material";

// icon
import { GoSearch } from "react-icons/go";

// hooks
import useSearchQuery from "@/hooks/useSearchQuery";

const InputSearchByName = () => {
  const { searchText, handleInputChange, handleKeyDown } = useSearchQuery();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "8px 0",
      }}
    >
      <InputBase
        placeholder="Search"
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
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

export default InputSearchByName;
