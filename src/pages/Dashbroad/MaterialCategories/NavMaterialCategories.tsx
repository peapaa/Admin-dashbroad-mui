import { Controller, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
// mui
import { Button, Typography, useTheme } from "@mui/material";

import useSearchQuery from "@/hooks/useSearchQuery";
// components
import ButtonClearSearch from "@/components/ButtonClearSearch";
import ButtonSearch from "@/components/ButtonSearch";
import InputSearchByName from "@/pages/Dashbroad/Categories/components/Input/InputSearchByName";
import { FormValuesMaterial } from "@/pages/Dashbroad/Categories/type";
import SearchByCategory from "@/pages/Dashbroad/MaterialCategories/components/inputSearch/SearchByCategory";

const NavMaterialCategories = () => {
  const theme = useTheme();
  const location = useLocation();
  const { handleKeyDown, handleKeyDownInputCategory } = useSearchQuery();
  const { handleSubmit, control, reset } = useForm<FormValuesMaterial>({
    defaultValues: {
      searchText: "",
      searchCategory: "",
    },
  });

  const onSubmit = (data: FormValuesMaterial) => {
    handleKeyDown(data.searchText);
    handleKeyDownInputCategory(data.searchCategory);
    console.log("data", data);
  };
  return (
    <div className="flex flex-col my-5 ">
      <Typography sx={{ fontSize: 24, color: theme.palette.text.primary }}>
        Marterial Category
      </Typography>
      <div className="flex justify-between items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between items-center gap-5"
        >
          <div className="flex gap-2 items-center">
            <Typography
              sx={{ fontSize: 18, color: theme.palette.text.secondary }}
            >
              Name
            </Typography>
            <Controller
              control={control}
              name="searchText"
              render={({ field }) => (
                <InputSearchByName
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Typography
              sx={{ fontSize: 18, color: theme.palette.text.secondary }}
            >
              Category
            </Typography>
            <Controller
              control={control}
              name="searchCategory"
              render={({ field }) => (
                <SearchByCategory
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <ButtonClearSearch reset={reset} />
          <ButtonSearch />
        </form>
        <div>
          <Button variant="contained">
            <Link to={`${location.pathname}/create-marterial-category`}>
              Create Material
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavMaterialCategories;
