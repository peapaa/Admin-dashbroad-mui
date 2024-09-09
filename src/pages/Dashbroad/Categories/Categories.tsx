// router
import { Route, Routes } from "react-router-dom";

// page
import ProtectedRouter from "@/components/Home/ProtectedRouter";
import CategoriesList from "@/pages/Dashbroad/Categories/CategoriesList";
import CreateCategory from "@/pages/Dashbroad/Categories/CreateCategory";
import EditCategory from "@/pages/Dashbroad/Categories/EditCategory";
import NavCategories from "@/pages/Dashbroad/Categories/NavCategories";
import LayoutContent from "@/pages/Dashbroad/LayoutContent/LayoutContent";

function Categories() {
  return (
    <LayoutContent>
      <Routes>
        <Route
          path="create-category"
          element={
            <ProtectedRouter>
              <CreateCategory />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="edit-category/:id"
          element={
            <ProtectedRouter>
              <EditCategory />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <NavCategories />
              <CategoriesList />
            </ProtectedRouter>
          }
        ></Route>
      </Routes>
    </LayoutContent>
  );
}

export default Categories;
