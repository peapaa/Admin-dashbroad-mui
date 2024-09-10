import React, { useEffect, useState } from "react";
// hoc
import { WithCategoriesProps } from "@/hoc/type";
// page
import { CategoriesProps } from "@/pages/Dashbroad/Categories/type";
// services
import { getAllCategoriesForMaterial } from "@/services/marterialCategoriesService";
function withGetCategories<T>(
  Component: React.ComponentType<T & WithCategoriesProps>
) {
  return (props: T) => {
    const [categories, setCategories] = useState<CategoriesProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<boolean>(false);
    const [retry, setRetry] = useState<boolean>(false);
    useEffect(() => {
      const getCategories = async () => {
        setLoading(true);
        setErrors(false);
        try {
          const response = await getAllCategoriesForMaterial();
          setCategories(response.data.results as CategoriesProps[]);
          // console.log("response", response);
          // const number = Math.random();
          // console.log(number);
          // const math = number > 0.1;
          // console.log("math", math);
          // if (math) {
          //   throw new Error();
          // }
        } catch (error) {
          console.error("error", error);
          setErrors(true);
        } finally {
          setLoading(false);
        }
      };
      getCategories();
    }, [retry]);

    return (
      <Component
        {...props}
        categories={categories}
        loading={loading}
        errors={errors}
        setRetry={setRetry}
      />
    );
  };
}

export default withGetCategories;
