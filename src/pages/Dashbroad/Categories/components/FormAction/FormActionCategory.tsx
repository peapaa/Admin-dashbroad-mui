import ButtonForm from "@/components/Button/ButtonForm";
import InputImage from "@/pages/Dashbroad/Categories/components/Input/InputImage";
import InputText from "@/pages/Dashbroad/Categories/components/Input/InputText";
import SelectOption from "@/pages/Dashbroad/Categories/components/Select/SelectOption";
import { FormActionProps } from "@/pages/Dashbroad/Categories/type";
import { price_types } from "@/utils/data";
import { Controller } from "react-hook-form";

const FormActionCategory: React.FC<FormActionProps> = ({
  onSubmit,
  formMethod,
  newImage,
  loading,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = formMethod;
  return (
    <div className="bg-white w-full rounded-md p-5 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-10 h-[400px] items-center justify-center"
      >
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => {
            return (
              <InputImage
                value={value as File[] | undefined}
                onChange={onChange}
                error={errors.image?.message}
                imageUrl={newImage}
              />
            );
          }}
        />
        <div className="flex flex-col items-center justify-center gap-5 w-[500px]">
          <div className=" flex flex-col w-full gap-5 items-center justify-center shadow-shadowCategory py-10 rounded-md">
            <div className="flex w-full gap-5 px-10">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex w-full gap-5">
                      <label htmlFor="name">
                        Name<span className="text-red-600"> *</span>:
                      </label>
                      <div className="grow">
                        <InputText
                          value={value as string}
                          onChange={onChange}
                          error={errors.name?.message}
                          typeInput="text"
                        />
                      </div>
                    </div>
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-5 px-10">
              <label htmlFor="price_type" className="flex-shrink-0 ">
                Price Type:
              </label>

              <Controller
                control={control}
                name="price_type"
                render={({ field: { onChange, value } }) => {
                  return (
                    <SelectOption
                      value={value as string}
                      onChange={onChange}
                      error={errors.price_type?.message}
                      optionValues={price_types}
                      id="price_type"
                    />
                  );
                }}
              />
            </div>
          </div>
          <ButtonForm loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default FormActionCategory;
