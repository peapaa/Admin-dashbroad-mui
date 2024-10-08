import { Controller } from "react-hook-form";
// pages
import InputText from "@/pages/Dashbroad/Categories/components/Input/InputText";
import {
  ControllerFormProps,
  MarterialCategoriesProps,
} from "@/pages/Dashbroad/MaterialCategories/type";

const ControllerFormInput: React.FC<ControllerFormProps> = ({
  control,
  errors,
  name,
  title,
  typeInput,
}) => {
  const keyName = name as keyof MarterialCategoriesProps;
  return (
    <Controller
      control={control}
      name={name as keyof MarterialCategoriesProps}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="flex flex-col w-full">
            <label htmlFor={name} className="my-2">
              {title}
              {title === "Name" || title === "Type" ? null : (
                <span className="text-red-600"> *</span>
              )}{" "}
              :
            </label>
            <InputText
              value={value as string}
              onChange={onChange}
              error={errors[keyName]?.message}
              typeInput={typeInput}
            />
          </div>
        );
      }}
    />
  );
};

export default ControllerFormInput;
