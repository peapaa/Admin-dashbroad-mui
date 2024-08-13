import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// mui
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// yup
import { yupResolver } from "@hookform/resolvers/yup";
import { createCategoryschema } from "./validateCategory";
// service
import { createCategories } from "../../../services/materialCategories";
// type
import { DataCategory } from "./type";
import formDataCategory from "./formDataCategory";
import { useSWRConfig } from "swr";
import { GetKeyUrlCategory } from "../../../utils/keyCategory";
const CreateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

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

  // get key url category
  const key = GetKeyUrlCategory();

  useEffect(() => {
    const handleSubmitForm = async (data: DataCategory) => {
      try {
        const formData = formDataCategory(data);
        await createCategories(formData);
        mutate(key);
        toast.success("Add category suscess!");
        navigate("/admin/resources/categories");
        reset(); // reset form data
      } catch (error) {
        console.log(error);
        toast.error("Add category false!");
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      handleSubmitForm(data);
    }
  }, [loading, data, navigate, reset, key, mutate]);

  const onSubmit = (data: DataCategory) => {
    console.log("data", data);
    setData(data);
    setLoading(true);
  };
  console.log("xxx", data);
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
  // console.log("data", data);s
  return (
    <div className="bg-white w-full rounded-md p-5 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-10 h-[400px] items-center"
      >
        <div className="flex flex-col gap-3 shadow-shadowCategory px-6 py-12 items-center justify-center rounded-md">
          <label
            htmlFor="image"
            className="mr-5 flex flex-col gap-3 items-center justify-center"
          >
            {newImage ? (
              <img
                src={newImage}
                alt="image category"
                className="w-[200px] h-[200px] object-cover rounded-lg"
              />
            ) : (
              <CloudUploadIcon sx={{ width: "100px", height: "50px" }} />
            )}
            <p>
              Accept <span className="text-red-600">*</span>: jpg, png, jpeg,
              svg
            </p>
          </label>
          <input
            type="file"
            {...register("image")}
            id="image"
            // className="hidden"
            accept=".jpg, .png, .jpeg, .svg"
            multiple={false}
            onChange={handleChangeImage}
          />
          {errors.image && data.image?.length === 0 && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div className=" flex flex-col gap-5 items-center justify-center shadow-shadowCategory px-20 py-10 rounded-md">
          <div className="">
            <label htmlFor="name">
              Name<span className="text-red-600"> *</span>:
            </label>
            <input
              type="text"
              id="name"
              className="border outline-none rounded-md ml-5 pl-3 h-8 w-[280px]"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex items-center ">
            <label htmlFor="price_type" className="mr-5">
              Price Type:
            </label>
            <select
              {...register("price_type")}
              className="border outline-none rounded-md px-2 py-1 w-[256px]"
              id="price_type"
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
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
