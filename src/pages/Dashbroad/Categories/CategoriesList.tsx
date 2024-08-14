import * as React from "react";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// mui
import { ExpandMore } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
//
import { useTheme } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
// component
import { Order } from "../../../components/CustomTableDetail";
import CustomTablePagination from "../../../components/CustomTablePagination";
import DeleteCategoryDialog from "../../../components/DeleteCategoryDialog";
//services
import {
  deleteOneCategories,
  getAllCategories,
} from "../../../services/materialCategories";
// hooks
import { toast } from "react-toastify";
import useSearchQuery from "../../../hooks/useSearchQuery";
// useSWR
import useSWR, { mutate } from "swr";
// type
import { GetKeyUrlCategory } from "../../../utils/keyCategory";
import { CategoriesProps, DeleteCategory, HeadCell } from "./type";

const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  { id: "image", numeric: true, disablePadding: false, label: "Avatar" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  {
    id: "price_type",
    numeric: false,
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
  selected: string[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, numSelected, rowCount, selected } =
    props;

  const createSortHandler =
    (property: keyof CategoriesProps) => (event: React.MouseEvent<unknown>) => {
      if (property !== "id") {
        // remove sort by id
        onRequestSort(event, property);
      }
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
            <TableSortLabel onClick={createSortHandler(headCell.id)}>
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
  const [orderBy, setOrderBy] =
    React.useState<keyof CategoriesProps>("created_at");
  const [selected, setSelected] = React.useState<string[]>([]);

  const [dense] = React.useState(false);
  const [rowsPerPage] = React.useState(5);
  const [totalCategory, setTotalCategory] = React.useState<number>(0);
  const theme = useTheme();

  const [selectedDeleteId, setselectedDeleteId] =
    React.useState<DeleteCategory>({
      id: "",
      loading: false,
    });
  const [open, setOpen] = React.useState<boolean>(false);
  // get searchText from hooks
  const { searchText, page } = useSearchQuery();

  const navigate = useNavigate();
  const [data, setData] = React.useState<CategoriesProps[]>([]);

  const sortData = (
    data: CategoriesProps[],
    order: "asc" | "desc",
    orderBy: keyof CategoriesProps
  ) => {
    return data.sort((a, b) => {
      let comparisonResult: number;
      if (orderBy === "name" || orderBy === "price_type") {
        comparisonResult = a[orderBy].localeCompare(b[orderBy]);
      } else if (orderBy === "created_at") {
        const dateA = Date.parse(a[orderBy]);
        const dateB = Date.parse(b[orderBy]);
        comparisonResult = dateA - dateB;
      } else {
        comparisonResult =
          (parseInt(a[orderBy]) || 0) - (parseInt(b[orderBy]) || 0);
      }
      return order === "asc" ? comparisonResult : -comparisonResult;
    });
  };

  // fetch data with clean up function
  // React.useEffect(() => {
  //   let ignore = false;
  //   const fetchApiAllCategory = async () => {
  //     try {
  //       const response = await getAllCategories(searchText, page);
  //       if (!ignore) {
  //         setData(response.data.results);
  //         setTotalCategory(response.data.count);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };
  //   fetchApiAllCategory();
  //   return () => {
  //     ignore = true;
  //   };
  // }, [searchText, page]);

  // get key url category
  const key = GetKeyUrlCategory();

  // useSWR
  const { data: categoriesData } = useSWR(
    key,
    ([url, searchText, page]: [string, string, number]) =>
      getAllCategories(url, searchText, page),
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: false,
    }
  );

  React.useEffect(() => {
    if (categoriesData) {
      setData(categoriesData.results);
      setTotalCategory(categoriesData.count);
    }
  }, [categoriesData]);

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
      const newSelecteds = data.map((row) => row.id.toString());
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

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

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  // delete selected category
  React.useEffect(() => {
    const fetchDeleteOneCategory = async (id: string) => {
      if (!id) return;
      try {
        await deleteOneCategories(id);
        mutate(key);
        toast.success("Delete category suscess!");
      } catch (error) {
        console.error(error);
        toast.error("Delete category false!");
      } finally {
        setselectedDeleteId((prev) => ({ ...prev, loading: false }));
      }
    };
    if (selectedDeleteId.loading && selectedDeleteId.id) {
      fetchDeleteOneCategory(selectedDeleteId.id);
    }
  }, [selectedDeleteId.loading, selectedDeleteId, key, page, searchText]);

  const handleDeleteCategory = (id: string) => {
    setselectedDeleteId((prev) => ({ ...prev, id: id }));
  };

  const sortedData = sortData(data, "desc", "created_at");
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
              {sortedData.map((row, index) => {
                const isItemSelected = isSelected(row.id.toString());
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id.toString())}
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
                    <TableCell align="center" width="5%">
                      <span className="font-bold" style={{ color: "#0EA5E9" }}>
                        {index + 1 + rowsPerPage * (page - 1)}
                      </span>
                    </TableCell>
                    <TableCell align="center" width="20%" height="130px">
                      <img
                        src={row.image}
                        alt="avatar"
                        className="object-cover w-full h-full rounded-lg "
                      />
                    </TableCell>
                    <TableCell align="center" width="20%">
                      <Typography
                        sx={{
                          color: theme.palette.textColor?.main,
                          width: "200px",
                        }}
                        className=" truncate"
                      >
                        <span>{row.name}</span>
                      </Typography>
                    </TableCell>
                    <TableCell align="center" width="20%">
                      <Typography
                        sx={{
                          color: theme.palette.textColor?.thrid,
                        }}
                      >
                        <span
                          style={{
                            backgroundColor:
                              row.price_type === "per_metter"
                                ? theme.palette.tagColor?.main
                                : theme.palette.textColor?.secondary,
                          }}
                          className="px-2 py-1 rounded-lg"
                        >
                          {row.price_type === "per_metter"
                            ? "Metter"
                            : "Quantity"}
                        </span>
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
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate(`edit-category/${row.id}`);
                          }}
                        >
                          <LiaEditSolid />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteCategory(row.id.toString());
                            setOpen(true);
                          }}
                        >
                          <RiDeleteBinLine />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomTablePagination
          count={totalCategory}
          rowsPerPage={rowsPerPage}
        />
        <DeleteCategoryDialog
          open={open}
          setOpen={setOpen}
          setselectedDeleteId={setselectedDeleteId}
        />
      </Paper>
    </Box>
  );
}
