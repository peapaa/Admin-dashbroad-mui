import { Controller } from "react-hook-form";
// pages
import SelectOption from "@/pages/Dashbroad/Categories/components/Select/SelectOption";
import {
  ControllerFormProps,
  MarterialCategoriesProps,
} from "@/pages/Dashbroad/MaterialCategories/type";
// mui
import { Box } from "@mui/material";

const ControllerFormSelect: React.FC<ControllerFormProps> = ({
  control,
  errors,
  name,
  title,
  OptionValues,
}) => {
  const keyName = name as keyof MarterialCategoriesProps;
  return (
    <Controller
      control={control}
      name={name as keyof MarterialCategoriesProps}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="flex flex-col">
            <label htmlFor={name} className="my-2 ml-5">
              {title}
              {title === "Name" || title === "Type" ? null : (
                <span className="text-red-600"> *</span>
              )}{" "}
              :
            </label>
            <Box className="ml-5">
              <SelectOption
                value={value as string}
                error={errors[keyName]?.message}
                onChange={onChange}
                optionValues={OptionValues ?? []}
                id={name}
              />
            </Box>
          </div>
        );
      }}
    />
  );
};

export default ControllerFormSelect;
