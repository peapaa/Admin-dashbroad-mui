import { Link } from "react-router-dom";

// mui
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// hook
import InputSearchByName from "@/pages/Dashbroad/Categories/components/Input/InputSearchByName";

const NavCategories = () => {
  const theme = useTheme();
  return (
    <div className="flex my-5 items-end justify-between">
      <div>
        <Typography sx={{ fontSize: 24, color: theme.palette.text.primary }}>
          Category
        </Typography>
        <InputSearchByName />
      </div>
      <div className="mb-2">
        <Button variant="contained">
          <Link to="/admin/resources/categories/create-category">
            Create Category
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NavCategories;
