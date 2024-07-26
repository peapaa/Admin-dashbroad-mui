import { Route, Routes } from "react-router-dom";
import LayoutContent from "../LayoutContent/LayoutContent";
import CategoriesList from "./CategoriesList";
import CreateCategory from "./CreateCategory";
import NavCategories from "./NavCategories";
import ProtectedRouter from "../../../components/ProtectedRouter";

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
