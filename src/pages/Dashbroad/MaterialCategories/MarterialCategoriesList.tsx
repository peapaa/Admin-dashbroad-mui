// component
import Loading from "@/components/Home/Loading";
import NoProduct from "@/components/Home/NoProduct";
import NotFound from "@/components/Home/NotFound";
import DeleteCategoryDialog from "@/components/Modal/DeleteCategoryDialog";
import CustomTablePagination from "@/components/TableCustom/CustomTablePagination";
import EnhancedTableHead from "@/components/TableCustom/EnhancedTableHead";
import SelectCheckAllTable from "@/components/TableCustom/SelectCheckAllTable";
// hooks
import useSearchQuery from "@/hooks/useSearchQuery";
import useSelectedItem from "@/hooks/useSelectedItem";
// pages
import { DeleteHandleProps } from "@/pages/Dashbroad/Categories/type";
import { GetAllMarterialCategoriesProps } from "@/pages/Dashbroad/MaterialCategories/type";
// service
import {
  deleteOneMaterial,
  deleteSelectedMutilpleMaterials,
  getAllMarterialCategories,
} from "@/services/marterialCategoriesService";
// utils
import { headCellMaterialCategory } from "@/utils/data";

import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MarterialCategoriesList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { selected, setSelected, handleSelectAllClick, handleSlectedItem } =
    useSelectedItem();
  const [totalMarterialCategory, setTotalMarterialCategory] =
    React.useState<number>(0);
  const [rowsPerPage] = React.useState<number>(5);
  const { searchText, searchCategory, page } = useSearchQuery();
  const [data, setData] = React.useState<GetAllMarterialCategoriesProps[]>([]);
  const location = useLocation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [idDeleteMaterial, setIdDeleteMaterial] = React.useState<string>("");

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const modalRefDeleteOne = useRef<DeleteHandleProps | null>(null);
  const modalRefDeleteMaterials = useRef<DeleteHandleProps | null>(null);
  const [reload, setReload] = React.useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    const fetchAllMaterialCategories = async () => {
      setLoading(true);
      try {
        const response = await getAllMarterialCategories(
          searchText,
          searchCategory,
          page
        );
        if (!ignore) {
          setData(response.data.results);
          setTotalMarterialCategory(response.data.count);
          setSelected([]);
        }
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMaterialCategories();
    return () => {
      ignore = true;
    };
  }, [page, searchCategory, searchText, setSelected, reload]);

  if (totalMarterialCategory > 0 && page) {
    if (page > Math.ceil(totalMarterialCategory / rowsPerPage)) {
      return <NotFound />;
    }
  }

  const handleOpenModal = () => {
    modalRefDeleteOne.current?.openModal();
  };

  const handleDeleteOneMaterial = async (id: string) => {
    setIdDeleteMaterial(id);
  };

  const handleClickDeleteOneMaterial = async () => {
    setLoading(true);
    try {
      await deleteOneMaterial(idDeleteMaterial);
      toast.success("delete material successfully");
      setReload((prev) => !prev);
    } catch (error) {
      console.error("error", error);
      toast.error("Delete material failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModalDeleteMaterials = () => {
    modalRefDeleteMaterials.current?.openModal();
  };

  const handleClickDeleteMaterials = async () => {
    setLoading(true);
    try {
      await deleteSelectedMutilpleMaterials(selected);
      toast.success(`Delete ${selected.length} materials`);
      setReload((prev) => !prev);
    } catch (error) {
      console.error("error", error);
      toast.error("delete material failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Box className="w-full h-full">
          <Box className="flex items-center justify-center h-screen">
            <Loading />
          </Box>
        </Box>
        ;
      </>
    );
  }

  if (totalMarterialCategory < 0) {
    return <NoProduct />;
  }

  return (
    <Box>
      <SelectCheckAllTable
        numSelected={selected.length}
        onSelectAllClick={(event) => handleSelectAllClick(event, data)}
        rowCount={data.length}
        selected={selected}
        handleOpenModal={handleOpenModalDeleteMaterials}
      />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1140px",
          minWidth: "840px",
          overflowX: "auto",
        }}
      >
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer
            sx={{
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                height: "8px",
              },
            }}
          >
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead headCells={headCellMaterialCategory} />
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <span
                          className="font-bold"
                          style={{ color: "#0EA5E9" }}
                        >
                          {index + 1 + rowsPerPage * (page - 1)}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            width: "180px",
                            height: "110px",
                          }}
                        >
                          <img
                            src={row.image}
                            alt="avatar"
                            className="object-cover w-full h-full rounded-lg "
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            color: theme.palette.textColor?.main,
                            width: "200px",
                          }}
                          className="truncate"
                        >
                          <span>{row.name}</span>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            color: theme.palette.textColor?.main,
                            width: "120px",
                          }}
                        >
                          <span>{row.part_number}</span>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            color: theme.palette.textColor?.main,
                          }}
                        >
                          {row.type ? (
                            <span
                              style={{
                                backgroundColor: theme.palette.tagColor?.main,
                              }}
                              className="px-2 py-1 rounded-md"
                            >
                              {row.type}
                            </span>
                          ) : null}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            color: theme.palette.textColor?.main,
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: theme.palette.tagColor?.main,
                            }}
                            className="px-2 py-1 rounded-md"
                          >
                            {row?.category?.name}
                          </span>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            color: theme.palette.textColor?.main,
                          }}
                        >
                          <span className="px-2 py-1 rounded-md">
                            {row.large_title}
                          </span>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            color: theme.palette.textColor?.main,
                            width: "100px",
                          }}
                        >
                          <span className="px-2 py-1 rounded-md">
                            {row.small_title}
                          </span>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            color: theme.palette.textColor?.main,
                            width: "100px",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor:
                                theme.palette.tagColor?.secondary,
                            }}
                            className="px-2 py-1 rounded-md"
                          >
                            {row.basic_price}
                          </span>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            color: theme.palette.textColor?.main,
                            width: "130px",
                          }}
                        >
                          <span>{row.supplier.name}</span>
                        </Typography>
                      </TableCell>
                      <TableCell align="center" className="icon-options-table">
                        <Box className="flex gap-5">
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(
                                  `${location.pathname}/edit-marterial-category/${row.id}`
                                );
                              }}
                            >
                              <LiaEditSolid />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDeleteOneMaterial(row.id);
                                handleOpenModal();
                              }}
                            >
                              <RiDeleteBinLine />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <CustomTablePagination
            count={totalMarterialCategory}
            rowsPerPage={rowsPerPage}
          />
          <DeleteCategoryDialog
            ref={modalRefDeleteOne}
            onClick={handleClickDeleteOneMaterial}
            content=" You want to delete material ?"
            title="Delete material"
          />
          <DeleteCategoryDialog
            ref={modalRefDeleteMaterials}
            onClick={handleClickDeleteMaterials}
            content={`You want to delete ${selected.length} material ?`}
            title="Delete material"
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default MarterialCategoriesList;
