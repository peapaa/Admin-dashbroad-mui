// type
import { EnhancedTableProps } from "@/pages/Dashbroad/Categories/type";

// mui
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { headCells } = props;

  return (
    <TableHead>
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
