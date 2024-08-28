// mui
import { Button, Typography, useTheme } from "@mui/material";

// components
import InputSearchByName from "@/pages/Dashbroad/Categories/components/Input/InputSearchByName";
import SearchByCategory from "@/pages/Dashbroad/MaterialCategories/components/SearchByCategory";
import { Link } from "react-router-dom";

const NavMaterialCategories = () => {
  const theme = useTheme();
  return (
    <div className="flex flex-col my-5 ">
      <Typography sx={{ fontSize: 24, color: theme.palette.text.primary }}>
        Marterial Category
      </Typography>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Typography
            sx={{ fontSize: 18, color: theme.palette.text.secondary }}
          >
            Name
          </Typography>
          <InputSearchByName />
        </div>
        <div className="flex gap-2 items-center">
          <Typography
            sx={{ fontSize: 18, color: theme.palette.text.secondary }}
          >
            Category
          </Typography>
          <SearchByCategory />
        </div>
        <div>
          <Button variant="contained">
            <Link to="/admin/resources/material-categories/create-marterial-category">
              Create Material
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavMaterialCategories;
