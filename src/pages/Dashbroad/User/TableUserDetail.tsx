import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import user1 from "../../../assets/images/table-logo/user1.png";
import user2 from "../../../assets/images/table-logo/user2.png";
import user3 from "../../../assets/images/table-logo/user3.png";
import user4 from "../../../assets/images/table-logo/user4.png";
import check from "../../../assets/images/table-logo/check.png";
import xIcon from "../../../assets/images/table-logo/x.png";
import { useTheme } from "@mui/material/styles";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { CiFilter } from "react-icons/ci";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import CustomTablePagination from "./CustomTablePagination";
import { Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface Data {
  id: number;
  avatar: string;
  admin: string | number;
  email: string;
  name: string;
  fa: string | number;
}

function createData(
  id: number,
  name: string,
  avatar: string,
  email: string,
  admin: string | number,
  fa: string | number
): Data {
  return {
    id,
    name,
    avatar,
    email,
    admin,
    fa,
  };
}

const rows: Data[] = [
  createData(1, "Cupcake", user1, "cupcake@example.com", "1", "1"),
  createData(2, "Donut", user2, "donut@example.com", "0", "0"),
  createData(3, "Eclair", user3, "eclair@example.com", "1", "1"),
  createData(4, "Frozen yoghurt", user4, "froyo@example.com", "0", "0"),
  createData(5, "Gingerbread", user1, "ginger@example.com", "1", "1"),
  createData(6, "Honeycomb", user2, "honey@example.com", "0", "0"),
  createData(7, "Ice cream sandwich", user3, "icecream@example.com", "1", "1"),
  createData(8, "Jelly Bean", user4, "jelly@example.com", "0", "0"),
  createData(9, "KitKat", user1, "kitkat@example.com", "1", "1"),
  createData(10, "Lollipop", user2, "lollipop@example.com", "0", "0"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  { id: "avatar", numeric: true, disablePadding: false, label: "Avatar" },
  { id: "name", numeric: true, disablePadding: false, label: "Name" },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  { id: "admin", numeric: true, disablePadding: false, label: "Admin" },
  { id: "fa", numeric: true, disablePadding: false, label: "2FA" },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, numSelected, rowCount } = props;

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
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
            </span>
            <div className="flex">
              <span className="flex cursor-pointer">
                <HiOutlineVideoCamera className="w-6 h-6" />
                <ExpandMore />
              </span>
              <span className="flex ml-3 cursor-pointer">
                <CiFilter className="w-6 h-6" />
                <ExpandMore />
              </span>
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: "#F1F5F9" }}>
        <TableCell></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
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
}

export default function TableUserDetail() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("avatar");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  // const [page] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  //   const [dense, setDense] = React.useState(false);
  const [rowsPerPage] = React.useState(5);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const theme = useTheme();

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.id);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, Number(row.id))}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox" width="5%">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="left" width="5%">
                        <span
                          className="font-bold"
                          style={{ color: "#0EA5E9" }}
                        >
                          {row.id}
                        </span>
                      </TableCell>
                      <TableCell align="left" width="10%">
                        <img src={row.avatar.toString()} alt="avatar" />
                      </TableCell>
                      <TableCell align="left" width="10%">
                        <Typography
                          sx={{ color: theme.palette.textColor?.main }}
                        >
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" width="20%">
                        <Typography
                          sx={{ color: theme.palette.textColor?.main }}
                        >
                          {row.email}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" width="5%">
                        {row.admin === "1" ? (
                          <img src={check} alt="check" />
                        ) : (
                          <img src={xIcon} alt="xIcon" />
                        )}
                      </TableCell>
                      <TableCell align="left" width="5%">
                        {row.fa === "1" ? (
                          <img src={check} alt="check" />
                        ) : (
                          <img src={xIcon} alt="xIcon" />
                        )}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                        className="icon-options-table"
                      >
                        <Tooltip title="More">
                          <IconButton
                            sx={{
                              padding: { md: "0", lg: "8px" },
                            }}
                          >
                            <IoIosMore />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Preview">
                          <IconButton
                            sx={{
                              padding: { md: "0", lg: "8px" },
                            }}
                          >
                            <VisibilityOutlinedIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit">
                          <IconButton>
                            <LiaEditSolid />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton>
                            <RiDeleteBinLine />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <CustomTablePagination
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}
