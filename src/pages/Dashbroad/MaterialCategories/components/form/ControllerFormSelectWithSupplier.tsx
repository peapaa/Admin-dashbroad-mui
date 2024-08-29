// HOC
import withGetSupplier from "@/hoc/withGetSupplier";
// pages
import ControllerFormSelect from "@/pages/Dashbroad/MaterialCategories/components/form/ControllerFormSelect";
import { ControllerFormSelectWithSupplierProps } from "@/pages/Dashbroad/MaterialCategories/type";

// eslint-disable-next-line react-refresh/only-export-components
const ControllerFormSelectWithSupplier = ({
  supplier,
  loading,
  errors,
  control,
  errorForm,
}: ControllerFormSelectWithSupplierProps) => {
  const OptionValueSupplier =
    supplier.length > 0
      ? supplier.map((item) => ({
          value: item.id,
          option: item.name,
        }))
      : [];
  return (
    <ControllerFormSelect
      control={control}
      errors={errorForm}
      name="supplier"
      title="Supplier"
      OptionValues={OptionValueSupplier}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default withGetSupplier(ControllerFormSelectWithSupplier);
