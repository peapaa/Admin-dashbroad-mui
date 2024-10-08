import { Controller, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

// mui
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// hook
import useSearchQuery from "@/hooks/useSearchQuery";

// pages
import InputSearchByName from "@/pages/Dashbroad/Categories/components/Input/InputSearchByName";

// type
import { FormValuesCategory } from "@/pages/Dashbroad/Categories/type";

const NavCategories = () => {
  const theme = useTheme();

  const location = useLocation();
  const { handleKeyDown } = useSearchQuery();
  const { handleSubmit, control } = useForm<FormValuesCategory>({
    defaultValues: {
      searchText: "",
    },
  });
  const onSubmit = (data: FormValuesCategory) => {
    handleKeyDown(data.searchText);
  };
  return (
    <div className="flex my-5 items-end justify-between">
      <div>
        <Typography sx={{ fontSize: 24, color: theme.palette.text.primary }}>
          Category
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      </div>
      <div className="mb-2">
        <Button variant="contained">
          <Link to={`${location.pathname}/create-category`}>
            Create Category
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NavCategories;
