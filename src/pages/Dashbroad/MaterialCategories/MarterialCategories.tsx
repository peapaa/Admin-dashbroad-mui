import ProtectedRouter from "@/components/ProtectedRouter";
import LayoutContent from "@/pages/Dashbroad/LayoutContent/LayoutContent";
import CreateMarterialCategory from "@/pages/Dashbroad/MaterialCategories/CreateMarterialCategory";
import MarterialCategoriesList from "@/pages/Dashbroad/MaterialCategories/MarterialCategoriesList";
import NavMaterialCategories from "@/pages/Dashbroad/MaterialCategories/NavMaterialCategories";
import { Route, Routes } from "react-router-dom";

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
          path="/create-marterial-category"
          element={
            <ProtectedRouter>
              <CreateMarterialCategory />
            </ProtectedRouter>
          }
        ></Route>
      </Routes>
    </LayoutContent>
  );
};

export default MarterialCategories;
