import * as React from "react";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

// mui
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

// component
import CustomTablePagination from "@/components/CustomTablePagination";
import DeleteCategoryDialog from "@/components/DeleteCategoryDialog";
import EnhancedTableHead from "@/components/EnhancedTableHead";
import NotFound from "@/components/NotFound";

//services
import {
  deleteOneCategories,
  getAllCategories,
} from "@/services/materialCategories";

// hooks
import useSearchQuery from "@/hooks/useSearchQuery";
import useSelectedItem from "@/hooks/useSelectedItem";
import { toast } from "react-toastify";

// useSWR
import useSWR, { mutate } from "swr";

// type
import {
  CategoriesProps,
  DeleteCategory,
  DeleteCategoryHandleProps,
  Order,
} from "./type";

// utils
import { useGetUrlCategory } from "@/hooks/useKeyCategory";
import { headCellCategory } from "@/utils/data";
import sortData from "@/utils/sortTable";

export default function CategoriesList() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof CategoriesProps>("created_at");
  const {
    selected,
    handleSlectedItem,
    handleSelectAllClick,
    handleClearSelected,
  } = useSelectedItem();
  const [dense] = React.useState(false);
  const [rowsPerPage] = React.useState(5);
  const [totalCategory, setTotalCategory] = React.useState<number>(0);
  const theme = useTheme();

  const modalRef = React.useRef<DeleteCategoryHandleProps | null>(null);
  const pageRef = React.useRef<number | undefined>(undefined);

  const [selectedDeleteId, setselectedDeleteId] =
    React.useState<DeleteCategory>({
      id: "",
      loading: false,
    });

  // get searchText from hooks
  const { searchText, page } = useSearchQuery();

  React.useEffect(() => {
    if (pageRef.current !== page) {
      handleClearSelected();
      pageRef.current = page;
    }
  }, [handleClearSelected, page]);

  const navigate = useNavigate();
  const [data, setData] = React.useState<CategoriesProps[]>([]);

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
  const { url } = useGetUrlCategory();

  // useSWR
  // const { data: categoriesData } = useSWR(
  //   key,
  //   ([url, searchText, page]: [string, string, number]) =>
  //     getAllCategories(url, searchText, page),
  // {
  //   revalidateIfStale: false,
  //   revalidateOnFocus: true,
  //   revalidateOnReconnect: false,
  // }
  // );

  const { data: categoriesData } = useSWR(url, getAllCategories, {});

  React.useEffect(() => {
    if (categoriesData) {
      setData(categoriesData.results);
      setTotalCategory(categoriesData.count);
    }
  }, [categoriesData, setTotalCategory]);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof CategoriesProps
  ) => {
    if (property === "id" || property === "image") {
      return;
    }
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // delete selected category
  React.useEffect(() => {
    const fetchDeleteOneCategory = async (id: string) => {
      if (!id) return;
      try {
        await deleteOneCategories(id);
        mutate(url);
        toast.success("Delete category suscess!");
      } catch (error) {
        console.error(error);
        toast.error("Delete category false!");
      } finally {
        setselectedDeleteId((prev) => ({ ...prev, id: "", loading: false }));
      }
    };
    if (selectedDeleteId.loading && selectedDeleteId.id) {
      fetchDeleteOneCategory(selectedDeleteId.id);
    }
  }, [selectedDeleteId.loading, selectedDeleteId, url, page, searchText]);

  const handleDeleteCategory = (id: string) => {
    setselectedDeleteId((prev) => ({ ...prev, id: id }));
  };

  if (totalCategory > 0 && page) {
    // check totalCategory vs page
    if (page > Math.ceil(totalCategory / rowsPerPage)) {
      return <NotFound />;
    }
  }

  const handleOpenModal = () => {
    modalRef.current?.openModal();
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
              onSelectAllClick={(event) => handleSelectAllClick(event, data)}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              selected={selected}
              headCells={headCellCategory}
            />
            <TableBody>
              {sortedData.map((row, index) => {
                const isItemSelected = isSelected(row.id.toString());
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => handleSlectedItem(row.id.toString())}
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
                            handleOpenModal();
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
          ref={modalRef}
          setselectedDeleteId={setselectedDeleteId}
        />
      </Paper>
    </Box>
  );
}
