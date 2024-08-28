import withGetSupplier from "@/hoc/withGetSupplier";
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
  console.log("loading", loading);
  console.log("errors", errors);
  console.log("supplier from controller", supplier);
  const OptionValueSupplier =
    supplier.length > 0
      ? supplier.map((item) => ({
          value: item.id,
          option: item.name,
        }))
      : [];
  console.log("options", OptionValueSupplier);
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
