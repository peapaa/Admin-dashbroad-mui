import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box className="w-full h-full">
      <Box className="flex items-center justify-center h-screen">
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default Loading;
