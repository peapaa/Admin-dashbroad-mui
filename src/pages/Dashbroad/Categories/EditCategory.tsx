import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// yup
import { yupResolver } from "@hookform/resolvers/yup";

// page
import InputImage from "@/pages/Dashbroad/Categories/components/Input/InputImage";
import InputText from "@/pages/Dashbroad/Categories/components/Input/InputText";
import formDataCategory from "@/pages/Dashbroad/Categories/formDataCategory";
import { DataCategory } from "@/pages/Dashbroad/Categories/type";
import { editCategoryschema } from "@/pages/Dashbroad/Categories/validateCategory";

// service
import SelectOption from "@/pages/Dashbroad/Categories/components/Select/SelectOption";
import { editCategory, getOneCategory } from "@/services/categoriesService";
import { price_types } from "@/utils/data";
import { Button } from "@mui/material";

const EditCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [newImage, setNewImage] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<DataCategory>({
    resolver: yupResolver(editCategoryschema),
  });

  useEffect(() => {
    const fetchGetOneCategory = async () => {
      try {
        if (id) {
          const response = await getOneCategory(id);
          const { name, image, price_type } = response.data;
          setValue("name", name);
          setValue("price_type", price_type); // image not required --> dont setValue to form
          setNewImage(image);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGetOneCategory();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<DataCategory> = useCallback(
    async (data) => {
      setLoading(true);
      try {
        if (id) {
          const formData = formDataCategory(data);
          await editCategory(formData, id);
          toast.success("Edit category suscess!");
          if (localStorage.getItem("redirectPath")) {
            navigate("/admin/resources/categories");
            localStorage.removeItem("redirectPath");
          } else {
            navigate(-1);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Edit category false!");
      } finally {
        setLoading(false);
      }
    },
    [id, navigate]
  );

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
        <div className="flex flex-col items-center justify-center gap-5">
          <div className=" flex flex-col gap-5 items-center justify-center shadow-shadowCategory px-20 py-10 rounded-md">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="flex">
                    <label htmlFor="name">
                      Name<span className="text-red-600"> *</span>:
                    </label>
                    <InputText
                      value={value as string}
                      onChange={onChange}
                      error={errors.name?.message}
                      typeInput="text"
                    />
                  </div>
                );
              }}
            />
            <div className="flex">
              <label htmlFor="price_type" className="mr-5 mt-1">
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
          <div className=" flex items-center justify-center gap-5">
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

export default EditCategory;
