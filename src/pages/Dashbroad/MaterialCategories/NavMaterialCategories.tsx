// mui
import { Typography, useTheme } from "@mui/material";

// components
import InputSearchByName from "@/pages/Dashbroad/Categories/components/Input/InputSearchByName";
import InputSearchByCategory from "@/pages/Dashbroad/MaterialCategories/components/InputSearchByCategory";

const NavMaterialCategories = () => {
  const theme = useTheme();
  return (
    <div className="flex flex-col my-5">
      <Typography sx={{ fontSize: 24, color: theme.palette.text.primary }}>
        Marterial Category
      </Typography>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Typography
            sx={{ fontSize: 18, color: theme.palette.text.secondary }}
          >
            Name
          </Typography>
          <InputSearchByName />
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Typography
              sx={{ fontSize: 18, color: theme.palette.text.secondary }}
            >
              Category
            </Typography>
            <InputSearchByCategory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMaterialCategories;
