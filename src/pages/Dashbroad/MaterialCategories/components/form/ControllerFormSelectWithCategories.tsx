import withGetCategories from "@/hoc/withGetCategories";
import ControllerFormSelect from "@/pages/Dashbroad/MaterialCategories/components/form/ControllerFormSelect";
import { ControllerFormSelectWithCategoriesProps } from "@/pages/Dashbroad/MaterialCategories/type";

// eslint-disable-next-line react-refresh/only-export-components
const ControllerFormSelectWithCategories = ({
  categories,
  loading,
  errors,
  control,
  errorForm,
}: ControllerFormSelectWithCategoriesProps) => {
  console.log("loading", loading);
  console.log("errors", errors);

  const OptionValues =
    categories.length > 0
      ? categories.map((category) => ({
          value: category.id,
          option: category.name,
        }))
      : [];
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
