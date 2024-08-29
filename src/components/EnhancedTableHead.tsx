// type
import { EnhancedTableProps } from "@/pages/Dashbroad/Categories/type";

// mui
import { ExpandMore } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

// utils

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { numSelected, rowCount, selected, headCells, handleOpenModal } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell
          colSpan={headCells.length + 2}
          style={{ paddingLeft: "4px" }}
        >
          <div className="flex items-center  justify-between w-[1024px]">
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
          <TableCell key={headCell.id} align="center">
            <TableSortLabel>
              <span className="font-bold" style={{ color: "#64748B" }}>
                {headCell.label}
              </span>
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
