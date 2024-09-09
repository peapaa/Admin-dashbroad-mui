// HOC
import ButtonRetry from "@/components/Button/ButtonRetry";
import Loading from "@/components/Home/Loading";
import { WithCategoriesProps } from "@/hoc/type";
import withGetCategories from "@/hoc/withGetCategories";
// pages
import ControllerFormSelect from "@/pages/Dashbroad/MaterialCategories/components/form/ControllerFormSelect";
import { ControllerFormSelectWithCategoriesProps } from "@/pages/Dashbroad/MaterialCategories/type";
/// mui
import { Box } from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
const ControllerFormSelectWithCategories = ({
  categories,
  loading,
  errors,
  setRetry,
  control,
  errorForm,
}: WithCategoriesProps & ControllerFormSelectWithCategoriesProps) => {
  const OptionValues =
    categories.length > 0
      ? categories.map((category) => ({
          value: category.id,
          option: category.name,
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
      name="category"
      title="Category"
      OptionValues={OptionValues}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default withGetCategories(ControllerFormSelectWithCategories);
