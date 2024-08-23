import { WithCategoriesProps } from "@/hoc/type";
import { CategoriesProps } from "@/pages/Dashbroad/Categories/type";
import { getAllCategoriesForMaterial } from "@/services/marterialCategoriesService";
import React, { useEffect, useState } from "react";
function withGetCategories<T>(
  Component: React.ComponentType<T & WithCategoriesProps>
) {
  return (props: T) => {
    const [categories, setCategories] = useState<CategoriesProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>("");
    useEffect(() => {
      const getCategories = async () => {
        setLoading(true);
        setErrors("");
        try {
          const response = await getAllCategoriesForMaterial();
          console.log("response", response);
          setCategories(response.data.results as CategoriesProps[]);
        } catch (error) {
          console.log("error", error);
          setErrors("fetch api categories failed");
        } finally {
          setLoading(false);
        }
      };
      getCategories();
    }, []);

    return (
      <Component
        {...props}
        categories={categories}
        loading={loading}
        errors={errors}
      />
    );
  };
}

export default withGetCategories;
