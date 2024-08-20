// type
import {
  CategoriesProps,
  EnhancedTableProps,
} from "@/pages/Dashbroad/Categories/type";

// mui
import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

// utils
import { visuallyHidden } from "@mui/utils";

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    order,
    orderBy,
    onRequestSort,
    numSelected,
    rowCount,
    selected,
    headCells,
    handleOpenModal,
  } = props;

  const createSortHandler = (property: keyof CategoriesProps) => {
    return (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          colSpan={headCells.length + 2}
          style={{ paddingLeft: "4px" }}
        >
          <div className="flex items-center  justify-between w-full">
            <span>
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={props.onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
              <ExpandMore className="cursor-pointer" />
              {selected.length > 0 ? (
                <span>{selected.length} selected</span>
              ) : null}
            </span>
            {numSelected > 0 && (
              <Button variant="contained" onClick={() => handleOpenModal()}>
                Delete record
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: "#F1F5F9" }}>
        <TableCell></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              onClick={createSortHandler(headCell.id)}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
            >
              <span className="font-bold" style={{ color: "#64748B" }}>
                {headCell.label}
              </span>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
