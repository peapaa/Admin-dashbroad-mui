import {
  Box,
  Button,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GoSearch } from "react-icons/go";

const NavUser = () => {
  const theme = useTheme();

  return (
    <div className="flex flex-col my-5">
      <Typography sx={{ fontSize: 24, color: theme.palette.textColor?.main }}>
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

        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.blueAccent?.secondary,
            textTransform: "none",
          }}
        >
          Create Users
        </Button>
      </Box>
    </div>
  );
};

export default NavUser;
