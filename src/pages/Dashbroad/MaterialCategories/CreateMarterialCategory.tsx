import InputImage from "@/pages/Dashbroad/Categories/components/Input/InputImage";
import ControllerFormInput from "@/pages/Dashbroad/MaterialCategories/components/ControllerFormInput";
import ControllerFormSelectWithCategories from "@/pages/Dashbroad/MaterialCategories/components/ControllerFormSelectWithCategories";
import formDataMaterial from "@/pages/Dashbroad/MaterialCategories/formDataMaterial";
import { MarterialCategoriesProps } from "@/pages/Dashbroad/MaterialCategories/type";
import { createMaterialSchema } from "@/pages/Dashbroad/MaterialCategories/validateMaterial";
import { createMaterialCategory } from "@/services/marterialCategoriesService";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateMarterialCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<MarterialCategoriesProps>({
    resolver: yupResolver(createMaterialSchema),
  });

  const onSubmit = useCallback(
    async (data: MarterialCategoriesProps) => {
      try {
        console.log("data");
        const formData = formDataMaterial(data);
        await createMaterialCategory(formData);
        console.log("data", data);
        toast.success("Add Material category suscess!");
        navigate("/admin/resources/material-categories");
        reset(); // reset form data
      } catch (error) {
        console.log(error);
        toast.error("Add material category false!");
      } finally {
        setLoading(false);
      }
    },
    [navigate, reset]
  );

  useEffect(() => {
    if (loading) {
      handleSubmit(onSubmit)();
    }
  }, [handleSubmit, loading, onSubmit]);

  console.log("error", errors);
  return (
    <div className="bg-white w-full rounded-md p-5 ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
        }}
      >
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
                <ControllerFormInput
                  control={control}
                  name="supplier"
                  errors={errors}
                  title="Supplier"
                  typeInput="string"
                />
              </div>
              {/* basic_price don't required */}
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center gap-5 py-5">
          <Button
            className="mt-20 w-40"
            type="button"
            style={{ border: "1px solid rgb(187 181 181 / 14%)" }}
            onClick={() => {
              if (localStorage.getItem("redirectPath")) {
                navigate("/admin/resources/material-categories");
                localStorage.removeItem("redirectPath");
              } else {
                navigate(-1);
              }
            }}
          >
            Back
          </Button>
          <Button className="mt-20 w-40" variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateMarterialCategory;
