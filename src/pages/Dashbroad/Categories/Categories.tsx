import LayoutContent from "../LayoutContent/LayoutContent";
import CategoriesList from "./CategoriesList";
import NavCategories from "./NavCategories";

function Categories() {
  return (
    <LayoutContent>
      <NavCategories />
      <CategoriesList />
    </LayoutContent>
  );
}

export default Categories;
