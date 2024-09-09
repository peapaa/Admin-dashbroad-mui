import { ComponentType, useEffect, useState } from "react";
// hoc
import { SupplierProps, withSupplierProps } from "@/hoc/type";
// service
import { getSupplier } from "@/services/supplierService";

function withGetSupplier<T>(Component: ComponentType<T & withSupplierProps>) {
  return (props: T) => {
    const [supplier, setSupplier] = useState<SupplierProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<boolean>(false);
    const [retry, setRetry] = useState<boolean>(false);

    useEffect(() => {
      const fetchGetSupplier = async () => {
        setLoading(true);
        setErrors(false);
        try {
          const response = await getSupplier();
          setSupplier(response.data.results as SupplierProps[]);
        } catch (error) {
          console.error(error);
          setErrors(true);
        } finally {
          setLoading(false);
        }
      };
      fetchGetSupplier();
    }, [retry]);
    return (
      <Component
        {...props}
        supplier={supplier}
        loading={loading}
        errors={errors}
        setRetry={setRetry}
      />
    );
  };
}
export default withGetSupplier;
