import {
  Box,
  Button,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GoSearch } from "react-icons/go";
import useSearchQuery from "../../../hooks/useSearchQuery";

const NavUser = () => {
  const theme = useTheme();
  const { searchText } = useSearchQuery();

  return (
    <div className="flex my-5 items-center justify-between">
      <div>
        <Typography sx={{ fontSize: 24, color: theme.palette.text.primary }}>
          Users
        </Typography>
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
            // onChange={handleInputChange}
            // onKeyDown={handleKeyDown}
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
      </div>
      <div>
        <Button variant="contained">Create User</Button>
      </div>
    </div>
  );
};

export default NavUser;
