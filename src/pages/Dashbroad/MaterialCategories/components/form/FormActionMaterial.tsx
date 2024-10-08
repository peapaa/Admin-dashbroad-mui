import { Controller } from "react-hook-form";
// components
import ButtonForm from "@/components/Button/ButtonForm";
// pages
import InputImage from "@/pages/Dashbroad/Categories/components/Input/InputImage";
import ControllerFormInput from "@/pages/Dashbroad/MaterialCategories/components/form/ControllerFormInput";
import ControllerFormSelectWithCategories from "@/pages/Dashbroad/MaterialCategories/components/form/ControllerFormSelectWithCategories";
import ControllerFormSelectWithSupplier from "@/pages/Dashbroad/MaterialCategories/components/form/ControllerFormSelectWithSupplier";
import { FormActionMateriaProps } from "@/pages/Dashbroad/MaterialCategories/type";
import { Grid } from "@mui/material";

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
        <div className="flex gap-10 my-20 h-[400px] items-center justify-center">
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

          <div className="w-full max-w-[660px] shadow-shadowCategory px-8 py-10 rounded-md">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* part_number required */}
                <div className="flex gap-5  w-full">
                  <ControllerFormInput
                    control={control}
                    name="part_number"
                    errors={errors}
                    title="Part number"
                    typeInput="string"
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
              </Grid>
              <Grid item xs={12}>
                <div className="flex gap-5  w-full">
                  {/* type don't required */}
                  <ControllerFormInput
                    control={control}
                    name="type"
                    errors={errors}
                    title="Type"
                    typeInput="number"
                  />

                  {/* name don't required */}
                  <ControllerFormInput
                    control={control}
                    name="name"
                    errors={errors}
                    title="Name"
                    typeInput="string"
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className="flex gap-5 w-full">
                  {/* small_title  required */}
                  <ControllerFormInput
                    control={control}
                    name="small_title"
                    errors={errors}
                    title="Small title"
                    typeInput="string"
                  />
                  {/* basic_price don't required */}
                  <ControllerFormInput
                    control={control}
                    name="basic_price"
                    errors={errors}
                    title="Basic price"
                    typeInput="number"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="flex gap-5 w-full">
                  {/* category required */}
                  <ControllerFormSelectWithCategories
                    control={control}
                    errorForm={errors}
                  />
                  {/* supplier  required */}
                  <ControllerFormSelectWithSupplier
                    control={control}
                    errorForm={errors}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <ButtonForm loading={loading} />
      </form>
    </div>
  );
};

export default FormActionMaterial;
