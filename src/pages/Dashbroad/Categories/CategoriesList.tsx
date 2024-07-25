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
import { useTheme } from "@mui/material/styles";
import { RiDeleteBinLine } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import CustomTablePagination from "../../../components/CustomTablePagination";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getComparator,
  Order,
  stableSort,
} from "../../../components/CustomTableDetail";
import { Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { CiFilter } from "react-icons/ci";
import { getAllCategories } from "../../../services/materialCategories";
interface CategoriesProps {
  id: number;
  name: string;
  image: string;
  price_type: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof CategoriesProps;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  { id: "image", numeric: true, disablePadding: false, label: "Avatar" },
  { id: "name", numeric: true, disablePadding: false, label: "Name" },
  {
    id: "price_type",
    numeric: true,
    disablePadding: false,
    label: "Price type",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CategoriesProps
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  selected: number[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, numSelected, rowCount, selected } =
    props;

  const createSortHandler =
    (property: keyof CategoriesProps) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  const handleDeleteSelectedRecord = () => {
    console.log("delete selected", selected);
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
            {numSelected > 0 && (
              <Button
                variant="contained"
                onClick={() => handleDeleteSelectedRecord()}
              >
                Delete record
              </Button>
            )}
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

export default function CategoriesList() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof CategoriesProps>("id");
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [dense] = React.useState(false);
  const [rowsPerPage] = React.useState(5);
  const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = React.useState<CategoriesProps[]>([]);

  // fetch data
  const x = async () => {
    const r = await getAllCategories();
    console.log(r);
    const data = r.data.results;
    setData(data);
  };
  React.useEffect(() => {
    x();
  }, []);

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageQueryParam = parseInt(queryParams.get("page") || "1", 10);
    if (!isNaN(pageQueryParam) && pageQueryParam !== page) {
      setPage(pageQueryParam - 1);
    }
  }, [location.search]);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    const queryParams = new URLSearchParams(location.search);
    if (newPage === 0) {
      queryParams.delete("page");
    } else {
      queryParams.set("page", (newPage + 1).toString());
    }
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof CategoriesProps
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((row) => row.id);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

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
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
              rowCount={data.length}
              selected={selected}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
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
                        <img src={row.image} alt="avatar" />
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
                          {row.price_type}
                        </Typography>
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                        className="icon-options-table"
                      >
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={(event) => event.stopPropagation()}
                          >
                            <LiaEditSolid />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={(event) => event.stopPropagation()}
                          >
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
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}
