import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// mui
import { Button } from "@mui/material";
// yup
import { yupResolver } from "@hookform/resolvers/yup";
import { createCategoryschema } from "./validateCategory";
// service
import { createCategories } from "../../../services/materialCategories";
// type
import { DataCategory } from "./type";
import formDataCategory from "./formDataCategory";
import { mutate } from "swr";

const CreateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DataCategory>({
    resolver: yupResolver(createCategoryschema),
  });

  const [data, setData] = useState<DataCategory>({
    image: [],
    name: "",
    price_type: "",
  });

  console.log("data", data);

  useEffect(() => {
    const handleSubmitForm = async (data: DataCategory) => {
      try {
        const formData = formDataCategory(data);
        await createCategories(formData);
        mutate(["/api/cms/material_categories", "", 1]);
        toast.success("Add category suscess!");
        navigate("/admin/resources/categories");
        reset(); // reset form data
      } catch (error) {
        console.log(error);
        toast.error("Add category false!");
      }
    };

    if (loading) {
      handleSubmitForm(data);
    }
  }, [loading, data, navigate, reset]);

  const onSubmit = (data: DataCategory) => {
    setData(data);
    setLoading(true);
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setData((prev) => ({
        ...prev,
        image: [file],
      }));
    }
  };

  return (
    <div className="bg-white w-full rounded-md p-5 ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
        <div className="flex flex-col gap-3">
          <label htmlFor="image" className="mr-5 flex flex-col gap-3">
            <p>
              Image<span className="text-red-600">*</span>:
            </p>
            {newImage ? (
              <img
                src={newImage}
                alt="image category"
                className="w-[200px] h-[240px] object-cover rounded-lg"
              />
            ) : null}
          </label>
          <input
            type="file"
            {...register("image")}
            id="image"
            accept=".jpg, .png, .jpeg, .svg"
            multiple={false}
            onChange={handleChangeImage}
          />
          {errors.image && data.image.length === 0 && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div className="">
          <label htmlFor="categoryname">
            Name<span className="text-red-600">*</span>:
          </label>
          <input
            type="text"
            id="categoryname"
            className="border outline-none rounded-md ml-5 pl-3 h-8 w-[280px]"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex items-center ">
          <label htmlFor="pricetype" className="mr-5">
            Price Type:
          </label>
          <select
            {...register("price_type")}
            className="border outline-none rounded-md px-2 py-1 w-[256px]"
            id="pricetype"
          >
            <option value="per_metter">Metter</option>
            <option value="per_quantity">Quantity</option>
          </select>
        </div>
        <div className="flex gap-5">
          <Button
            className="mt-20 w-40"
            type="button"
            style={{ border: "1px solid rgb(187 181 181 / 14%)" }}
            onClick={() => navigate(-1)}
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

export default CreateCategory;
