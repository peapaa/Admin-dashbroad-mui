import InputImage from "@/pages/Dashbroad/Categories/components/Input/InputImage";
import InputText from "@/pages/Dashbroad/Categories/components/Input/InputText";
import { createCategoryschema } from "@/pages/Dashbroad/Categories/validateCategory";
import { MarterialCategoriesProps } from "@/pages/Dashbroad/MaterialCategories/type";
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
    resolver: yupResolver(createCategoryschema),
    defaultValues: {},
  });

  const onSubmit = useCallback(
    async (data: MarterialCategoriesProps) => {
      try {
        // const formData = formDataCategory(data);
        // await createCategories(formData);
        console.log("data", data);
        toast.success("Add category suscess!");
        navigate("/admin/resources/categories");
        reset(); // reset form data
      } catch (error) {
        console.log(error);
        toast.error("Add category false!");
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

  return (
    <div className="bg-white w-full rounded-md p-5 ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
        }}
        className="flex gap-10 my-16 h-[400px] items-center justify-center"
      >
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
              <Controller
                control={control}
                name="part_number"
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col">
                      <label htmlFor="part_number" className="my-2 ml-5">
                        Part number<span className="text-red-600"> *</span>:
                      </label>
                      <InputText
                        value={value as string}
                        onChange={onChange}
                        error={errors.part_number?.message}
                      />
                    </div>
                  );
                }}
              />
              {/* name don't required */}
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col">
                      <label htmlFor="name" className="my-2 ml-5">
                        name:
                      </label>
                      <InputText
                        value={value as string}
                        onChange={onChange}
                        error={errors.name?.message}
                      />
                    </div>
                  );
                }}
              />
              {/* type don't required */}
              <Controller
                control={control}
                name="type"
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col">
                      <label htmlFor="type" className="my-2 ml-5">
                        Type:
                      </label>
                      <InputText
                        value={value as string}
                        onChange={onChange}
                        error={errors.name?.message}
                      />
                    </div>
                  );
                }}
              />
              {/* large_title  don't required */}
              <Controller
                control={control}
                name="large_title"
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col">
                      <label htmlFor="large_title" className="my-2 ml-5">
                        Large title <span className="text-red-600"> *</span>:
                      </label>
                      <InputText
                        value={value as string}
                        onChange={onChange}
                        error={errors.name?.message}
                      />
                    </div>
                  );
                }}
              />
            </div>

            <div className="flex flex-col">
              {/* small_title   don't required */}
              <Controller
                control={control}
                name="small_title"
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col">
                      <label htmlFor="small_title" className="my-2 ml-5">
                        Small title <span className="text-red-600"> *</span>:
                      </label>
                      <InputText
                        value={value as string}
                        onChange={onChange}
                        error={errors.name?.message}
                      />
                    </div>
                  );
                }}
              />

              <Controller
                control={control}
                name="basic_price"
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col">
                      <label htmlFor="basic_price" className="my-2 ml-5">
                        Basic price <span className="text-red-600"> *</span>:
                      </label>
                      <InputText
                        value={value as string}
                        onChange={onChange}
                        error={errors.name?.message}
                      />
                    </div>
                  );
                }}
              />
              {/* category don't required */}
              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col">
                      <label htmlFor="category" className="my-2 ml-5">
                        Category <span className="text-red-600"> *</span>:
                      </label>
                      <InputText
                        value={value as string}
                        onChange={onChange}
                        error={errors.name?.message}
                      />
                    </div>
                  );
                }}
              />
              {/* supplier  don't required */}
              <Controller
                control={control}
                name="supplier"
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col">
                      <label htmlFor="supplier" className="my-2 ml-5">
                        Supplier <span className="text-red-600"> *</span>:
                      </label>
                      <InputText
                        value={value as string}
                        onChange={onChange}
                        error={errors.name?.message}
                      />
                    </div>
                  );
                }}
              />
            </div>
            {/* basic_price don't required */}
          </div>
          <div className=" flex items-center justify-center gap-5 ">
            <Button
              className="mt-20 w-40"
              type="button"
              style={{ border: "1px solid rgb(187 181 181 / 14%)" }}
              onClick={() => {
                if (localStorage.getItem("redirectPath")) {
                  navigate("/admin/resources/categories");
                  localStorage.removeItem("redirectPath");
                } else {
                  navigate(-1);
                }
              }}
            >
              Back
            </Button>
            <Button
              className="mt-20 w-40"
              variant="contained"
              type="submit"
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMarterialCategory;
