import ButtonForm from "@/components/ButtonForm";
import InputImage from "@/pages/Dashbroad/Categories/components/Input/InputImage";
import ControllerFormInput from "@/pages/Dashbroad/MaterialCategories/components/form/ControllerFormInput";
import ControllerFormSelectWithCategories from "@/pages/Dashbroad/MaterialCategories/components/form/ControllerFormSelectWithCategories";
import ControllerFormSelectWithSupplier from "@/pages/Dashbroad/MaterialCategories/components/form/ControllerFormSelectWithSupplier";
import { FormActionMateriaProps } from "@/pages/Dashbroad/MaterialCategories/type";
import { Controller } from "react-hook-form";

const FormActionMaterial: React.FC<FormActionMateriaProps> = ({
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10 my-10 h-[400px] items-center justify-center">
          {/* image required */}
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

          <div className="flex flex-col items-center justify-center gap-5">
            <div className=" flex gap-5 items-center justify-center shadow-shadowCategory px-8 py-10 rounded-md">
              {/* part_number required */}
              <div className="flex flex-col">
                <ControllerFormInput
                  control={control}
                  name="part_number"
                  errors={errors}
                  title="Part number"
                  typeInput="string"
                />
                {/* name don't required */}
                <ControllerFormInput
                  control={control}
                  name="name"
                  errors={errors}
                  title="Name"
                  typeInput="string"
                />
                {/* type don't required */}

                <ControllerFormInput
                  control={control}
                  name="type"
                  errors={errors}
                  title="Type"
                  typeInput="number"
                />

                {/* large_title required */}

                <ControllerFormInput
                  control={control}
                  name="large_title"
                  errors={errors}
                  title="Large title"
                  typeInput="string"
                />
              </div>

              <div className="flex flex-col">
                {/* small_title  required */}
                <ControllerFormInput
                  control={control}
                  name="small_title"
                  errors={errors}
                  title="Small title"
                  typeInput="string"
                />
                {/*basic_price required */}
                <ControllerFormInput
                  control={control}
                  name="basic_price"
                  errors={errors}
                  title="Basic price"
                  typeInput="number"
                />
                {/* category required */}
                <ControllerFormSelectWithCategories
                  control={control}
                  errorForm={errors}
                  categories={[]}
                  loading={false}
                  errors={""}
                />
                {/* supplier  required */}
                <ControllerFormSelectWithSupplier
                  control={control}
                  errorForm={errors}
                  supplier={[]}
                  loading={false}
                  errors={""}
                />
              </div>
              {/* basic_price don't required */}
            </div>
          </div>
        </div>
        <ButtonForm loading={loading} />
      </form>
    </div>
  );
};

export default FormActionMaterial;
