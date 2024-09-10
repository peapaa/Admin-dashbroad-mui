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
import NotFound from "@/components/Home/NotFound";
import DeleteCategoryDialog from "@/components/Modal/DeleteCategoryDialog";
import CustomTablePagination from "@/components/TableCustom/CustomTablePagination";
import EnhancedTableHead from "@/components/TableCustom/EnhancedTableHead";

//services
import {
  deleteOneCategories,
  deleteSelectedMutilpleCategories,
  getAllCategories,
} from "@/services/categoriesService";

// hooks
import useSearchQuery from "@/hooks/useSearchQuery";
import useSelectedItem from "@/hooks/useSelectedItem";
import { toast } from "react-toastify";

// useSWR
import useSWR, { mutate } from "swr";

// type
import { CategoriesProps, DeleteCategory, DeleteHandleProps } from "./type";

// utils
import ButtonRetry from "@/components/Button/ButtonRetry";
import NoProduct from "@/components/Home/NoProduct";
import SelectCheckAllTable from "@/components/TableCustom/SelectCheckAllTable";
import { useGetUrlCategory } from "@/hooks/useKeyCategory";
import { headCellCategory } from "@/utils/data";

export default function CategoriesList() {
  const { selected, handleSlectedItem, handleSelectAllClick, setSelected } =
    useSelectedItem();

  const [rowsPerPage] = React.useState(5);
  const [totalCategory, setTotalCategory] = React.useState<number>(0);

  const theme = useTheme();
  //ref
  const modalRef = React.useRef<DeleteHandleProps | null>(null);
  const modalRefDeleteCategories = React.useRef<DeleteHandleProps | null>(null);

  const [loadingDeleteCategoies, setLoadingDeleteCategoies] =
    React.useState<boolean>(false);
  const [selectedDeleteId, setselectedDeleteId] = React.useState<
    DeleteCategory<string>
  >({
    id: "",
    loading: false,
  });

  // get searchText from hooks
  const { searchText, page } = useSearchQuery();
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

  const { data: categoriesData, error } = useSWR(url, getAllCategories, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false, // don't should retry when error
  });

  React.useEffect(() => {
    if (categoriesData) {
      setData(categoriesData.results);
      setTotalCategory(categoriesData.count);
      setSelected([]);
    }
  }, [categoriesData, setSelected, setTotalCategory]);

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

  // delete multiple categories
  React.useEffect(() => {
    const handleDeleteSelectedRecord = async (id: string[]) => {
      if (id.length === 0) return;
      try {
        await deleteSelectedMutilpleCategories(id);
        mutate(url);
        toast.success(`Delete ${selected.length} category susscess!`);
      } catch (err) {
        console.error(err);
        toast.error("Delete list category false!");
      } finally {
        setLoadingDeleteCategoies(false);
      }
    };
    if (loadingDeleteCategoies) {
      handleDeleteSelectedRecord(selected);
    }
  }, [loadingDeleteCategoies, selected, url]);

  const handleClickDeleteOneCategory = () => {
    setselectedDeleteId((prev) => ({ ...prev, loading: true }));
  };

  const handleClickDeleteCategories = () => {
    setLoadingDeleteCategoies(true);
  };

  const handleRetry = () => {
    if (error?.response?.status === 404) {
      return;
    }
    return mutate(url);
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

  const handleOpenModalDeleteCategories = () => {
    modalRefDeleteCategories.current?.openModal();
  };

  if (totalCategory < 0) {
    <NoProduct />;
  }

  if (totalCategory < 0) {
    <NoProduct />;
  }
  if (error) {
    return (
      <Box className="flex items-center justify-center h-[300px] ">
        <ButtonRetry onClick={handleRetry} />
      </Box>
    );
  }
  return (
    <Box>
      <SelectCheckAllTable
        numSelected={selected.length}
        onSelectAllClick={(event) => handleSelectAllClick(event, data)}
        rowCount={data.length}
        selected={selected}
        handleOpenModal={handleOpenModalDeleteCategories}
      />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead headCells={headCellCategory} />
              <TableBody>
                {data.map((row, index) => {
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
                        <span
                          className="font-bold"
                          style={{ color: "#0EA5E9" }}
                        >
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
            onClick={handleClickDeleteOneCategory}
            content=" You want to delete category ?"
            title="Delete category"
          />
          <DeleteCategoryDialog
            ref={modalRefDeleteCategories}
            onClick={handleClickDeleteCategories}
            content={`You want to delete ${selected.length} category ?`}
            title="Delete category"
          />
        </Paper>
      </Box>
    </Box>
  );
}
