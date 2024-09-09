// type
import { InputSearchProps } from "@/pages/Dashbroad/Categories/type";

// mui
import { Box, InputAdornment, InputBase } from "@mui/material";

// icon
import { GoSearch } from "react-icons/go";

const InputSearchByName: React.FC<InputSearchProps> = ({ value, onChange }) => {
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          width: "320px",
          height: "32px",
          borderRadius: "25px",
          paddingLeft: "8px",
          color: "#94A3B8",
        }}
        className="bg-white shadow-shadowInput"
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
