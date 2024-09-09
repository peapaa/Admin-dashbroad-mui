// HOC
import ButtonRetry from "@/components/Button/ButtonRetry";
import Loading from "@/components/Home/Loading";
import { withSupplierProps } from "@/hoc/type";
import withGetSupplier from "@/hoc/withGetSupplier";
// pages
import ControllerFormSelect from "@/pages/Dashbroad/MaterialCategories/components/form/ControllerFormSelect";
import { ControllerFormSelectWithSupplierProps } from "@/pages/Dashbroad/MaterialCategories/type";
import { Box } from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
const ControllerFormSelectWithSupplier = ({
  supplier,
  loading,
  errors,
  setRetry,
  control,
  errorForm,
}: withSupplierProps & ControllerFormSelectWithSupplierProps) => {
  const OptionValueSupplier =
    supplier.length > 0
      ? supplier.map((item) => ({
          value: item.id,
          option: item.name,
        }))
      : [];

  if (loading) {
    return (
      <>
        <Box className="flex items-center justify-center h-[92px]">
          <Loading className="!w-6 !h-6" />
        </Box>
      </>
    );
  }

  if (errors) {
    return (
      <Box className="flex items-center justify-center h-[92px] relative">
        <ButtonRetry
          onClick={() => setRetry((prev) => !prev)}
          className="absolute top-3"
        />
      </Box>
    );
  }

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
