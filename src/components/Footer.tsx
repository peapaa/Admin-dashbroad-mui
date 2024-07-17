import { Box, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ marginTop: "30px", marginBottom: "10px" }}>
      <div className="flex items-center justify-center">
        <Typography
          sx={{
            marginRight: "3px",
            color: theme.palette.textColor?.main,
          }}
        >
          Powered by
        </Typography>
        <Typography
          sx={{
            marginRight: "3px",
            color: theme.palette.blueAccent?.secondary,
          }}
          className="font-bold"
        >
          Laravel Nova
        </Typography>
        <Typography
          sx={{
            color: theme.palette.textColor?.main,
          }}
        >
          · v4.0.3 (Silver Surfer)
        </Typography>
      </div>
      <div className="flex items-center justify-center">
        <Typography
          sx={{
            color: theme.palette.textColor?.main,
          }}
        >
          © 2022 Laravel LLC · by Taylor Otwell and David Hemphill.
        </Typography>
      </div>
    </Box>
  );
};

export default Footer;
