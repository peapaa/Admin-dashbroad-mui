import React, { useEffect, useState } from "react";
import { Box, InputAdornment, InputBase, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GoSearch } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";

const NavUser = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";
    setSearchText(searchQuery);
  }, [location.search]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newSearchParams = new URLSearchParams(location.search);
      // console.log("newSearchParams", newSearchParams.toString());
      if (searchText.trim() === "") {
        newSearchParams.delete("search");
      } else {
        newSearchParams.set("search", searchText.trim());
      }

      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    }
  };

  return (
    <div className="flex flex-col my-5">
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
    </div>
  );
};

export default NavUser;
