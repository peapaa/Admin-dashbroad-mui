import CustomTablePagination from "@/components/CustomTablePagination";
import EnhancedTableHead from "@/components/EnhancedTableHead";
import useSearchQuery from "@/hooks/useSearchQuery";
import useSelectedItem from "@/hooks/useSelectedItem";
import { CategoriesProps, Order } from "@/pages/Dashbroad/Categories/type";
import { MarterialCategoriesProps } from "@/pages/Dashbroad/MaterialCategories/type";
import { getAllMarterialCategories } from "@/services/marterialCategoriesService";
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
import React, { useEffect } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const MarterialCategoriesList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [order] = React.useState<Order>("asc");
  const [orderBy] = React.useState<keyof CategoriesProps>("created_at");
  const { selected, handleSelectAllClick, handleSlectedItem } =
    useSelectedItem();
  const [totalMarterialCategory, setTotalMarterialCategory] =
    React.useState<number>(0);
  const [rowsPerPage] = React.useState<number>(5);
  const { searchText, searchCategory, page } = useSearchQuery();
  const [data, setData] = React.useState<MarterialCategoriesProps[]>([]);

  const handleOpenModalDeleteCategories = () => {};
  const handleRequestSort = () => {};
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  useEffect(() => {
    let ignore = false;
    const fetchAllMaterialCategories = async () => {
      try {
        const response = await getAllMarterialCategories(
          searchText,
          searchCategory,
          page
        );
        if (!ignore) {
          setData(response.data.results);
          setTotalMarterialCategory(response.data.count);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMaterialCategories();
    return () => {
      ignore = true;
    };
  }, [page, searchCategory, searchText]);

  return (
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
            minWidth: "840px",
            maxWidth: "100%",
            overflowX: "auto",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              height: "8px",
            },
          }}
        >
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(event) => handleSelectAllClick(event, data)}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              selected={selected}
              headCells={headCellMaterialCategory}
              handleOpenModal={handleOpenModalDeleteCategories}
            />
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
                      <span className="font-bold" style={{ color: "#0EA5E9" }}>
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
                        <span
                          style={{
                            backgroundColor: theme.palette.tagColor?.secondary,
                          }}
                          className="px-2 py-1 rounded-md"
                        >
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
                        <span
                          style={{
                            backgroundColor: theme.palette.tagColor?.secondary,
                          }}
                          className="px-2 py-1 rounded-md"
                        >
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
                            backgroundColor: theme.palette.tagColor?.secondary,
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
                              // handleDeleteCategory(row.id.toString());
                              // handleOpenModal();
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
        {/* <DeleteCategoryDialog
          ref={modalRef}
          handleClickDeleteCategory={handleClickDeleteOneCategory}
          content=" You want to delete category ?"
        />
        <DeleteCategoryDialog
          ref={modalRefDeleteCategories}
          handleClickDeleteCategory={handleClickDeleteCategories}
          content={`You want to delete ${selected.length} category ?`}
        /> */}
      </Paper>
    </Box>
  );
};

export default MarterialCategoriesList;
