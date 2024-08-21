import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// mui
import { Button } from "@mui/material";

// yup
import { yupResolver } from "@hookform/resolvers/yup";

// service
import { createCategories } from "@/services/materialCategories";

// type
import { DataCategory } from "@/pages/Dashbroad/Categories/type";

//page
import InputImage from "@/pages/Dashbroad/Categories/components/Input/InputImage";
import InputText from "@/pages/Dashbroad/Categories/components/Input/InputText";
import formDataCategory from "@/pages/Dashbroad/Categories/formDataCategory";

// utils
import SelectOption from "@/pages/Dashbroad/Categories/components/Select/SelectOption";
import { createCategoryschema } from "@/pages/Dashbroad/Categories/validateCategory";

const CreateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<DataCategory>({
    resolver: yupResolver(createCategoryschema),
    defaultValues: {
      image: [],
      name: "",
      price_type: "per_metter",
    },
  });

  const onSubmit = useCallback(
    async (data: DataCategory) => {
      try {
        const formData = formDataCategory(data);
        await createCategories(formData);
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
              />
            );
          }}
        />
        <div className="flex flex-col items-center justify-center gap-5">
          <div className=" flex flex-col gap-5 items-center justify-center shadow-shadowCategory px-20 py-10 rounded-md">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => {
                return (
                  <InputText
                    value={value as string}
                    onChange={onChange}
                    error={errors.name?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="price_type"
              render={({ field: { onChange, value } }) => {
                return (
                  <SelectOption
                    value={value as string}
                    onChange={onChange}
                    error={errors.price_type?.message}
                  />
                );
              }}
            />
          </div>
          <div className=" flex items-center justify-center gap-5 ">
            <Button
              className="mt-20 w-40"
              type="button"
              style={{ border: "1px solid rgb(187 181 181 / 14%)" }}
              onClick={() => {
                navigate(-1);
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

export default CreateCategory;
