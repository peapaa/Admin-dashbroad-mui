import React from "react";

// mui
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// hooks
import useSearchQuery from "@/hooks/useSearchQuery";

interface CustomTablePaginationProps {
  count: number;
  rowsPerPage: number;
}

const CustomTablePagination: React.FC<CustomTablePaginationProps> = ({
  count,
  rowsPerPage,
}) => {
  const { handleNextPage, handlePrevPage, page } = useSearchQuery();

  const handleBackButtonClick = () => {
    handlePrevPage();
  };

  const handleNextButtonClick = () => {
    handleNextPage();
  };
  const displayRangeStart = (page - 1) * rowsPerPage + 1;
  const displayRangeEnd = Math.min(count, page * rowsPerPage);
  const theme = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ margin: "0 12px" }}
    >
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 1}
        aria-label="previous page"
      >
        <Typography
          sx={{ fontSize: theme.typography.body1 }}
          className="font-bold"
        >
          Previous
        </Typography>
      </IconButton>
      <Box mx={2}>
        <Typography sx={{ color: theme.palette.textColor?.main }}>
          {count > 0
            ? `${displayRangeStart}-${displayRangeEnd} of ${count}`
            : "No Category"}
        </Typography>
      </Box>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page > Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <Typography
          sx={{ fontSize: theme.typography.body1 }}
          className="font-bold"
        >
          Next
        </Typography>
      </IconButton>
    </Box>
  );
};

export default CustomTablePagination;
