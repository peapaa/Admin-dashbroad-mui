import { ComponentType, useEffect, useState } from "react";
// hoc
import { SupplierProps, withSupplierProps } from "@/hoc/type";
// service
import { getSupplier } from "@/services/supplierService";

function withGetSupplier<T>(Component: ComponentType<T & withSupplierProps>) {
  return (props: T) => {
    const [supplier, setSupplier] = useState<SupplierProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>("");
    useEffect(() => {
      const fetchGetSupplier = async () => {
        setLoading(true);
        try {
          const response = await getSupplier();
          setSupplier(response.data.results as SupplierProps[]);
        } catch (error) {
          console.error(error);
          setErrors("fetch get supplier failed");
        } finally {
          setLoading(false);
        }
      };
      fetchGetSupplier();
    }, []);
    return (
      <Component
        {...props}
        supplier={supplier}
        loading={loading}
        errors={errors}
      />
    );
  };
}
export default withGetSupplier;
