import { Route, Routes } from "react-router-dom";
// components
import ProtectedRouter from "@/components/Home/ProtectedRouter";
// pages
import LayoutContent from "@/pages/Dashbroad/LayoutContent/LayoutContent";
import CreateMarterialCategory from "@/pages/Dashbroad/MaterialCategories/CreateMarterialCategory";
import EditMaterialCategory from "@/pages/Dashbroad/MaterialCategories/EditMaterialCategory";
import MarterialCategoriesList from "@/pages/Dashbroad/MaterialCategories/MarterialCategoriesList";
import NavMaterialCategories from "@/pages/Dashbroad/MaterialCategories/NavMaterialCategories";

const MarterialCategories = () => {
  return (
    <LayoutContent>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <NavMaterialCategories />
              <MarterialCategoriesList />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="create-marterial-category"
          element={
            <ProtectedRouter>
              <CreateMarterialCategory />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="edit-marterial-category/:id"
          element={
            <ProtectedRouter>
              <EditMaterialCategory id={""} />
            </ProtectedRouter>
          }
        ></Route>
      </Routes>
    </LayoutContent>
  );
};

export default MarterialCategories;
