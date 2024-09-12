import { withSupplierProps } from "@/hoc/type";
import withGetSupplier from "@/hoc/withGetSupplier";
import { getAllCategoriesForMaterial } from "@/services/marterialCategoriesService";
import { useEffect } from "react";
// eslint-disable-next-line react-refresh/only-export-components
const Tag = ({ supplier }: withSupplierProps) => {
  // if (loading) return <div>Loading...</div>;
  // if (errors) return <div>errors...</div>;
  console.log("supplier from tag", supplier);
  console.time("filter array");

  useEffect(() => {
    const fetch = async () => {
      const response = await getAllCategoriesForMaterial(); // test HOC
      console.log("response.data", response.data);
    };
    fetch();
  }, []);
  console.timeEnd("filter array");
  console.log("supplier", supplier);
  return (
    <div>
      {supplier.map((supplier, index) => (
        <div key={index}>{supplier.name}</div>
      ))}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default withGetSupplier(Tag);
