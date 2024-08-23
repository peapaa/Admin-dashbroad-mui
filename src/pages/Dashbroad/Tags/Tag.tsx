import { WithCategoriesProps } from "@/hoc/type";
import withGetCategories from "@/hoc/withGetCategories";
import { getAllCategoriesForMaterial } from "@/services/marterialCategoriesService";
import { useEffect } from "react";
const Tag = ({ categories }: WithCategoriesProps) => {
  // if (loading) return <div>Loading...</div>;
  // if (errors) return <div>errors...</div>;
  useEffect(() => {
    const fetch = async () => {
      const response = await getAllCategoriesForMaterial(); // test HOC
      console.log("response.data", response.data);
    };
    fetch();
  }, []);
  console.log(categories);
  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>{category.name}</div>
      ))}
    </div>
  );
};

export default withGetCategories(Tag);
