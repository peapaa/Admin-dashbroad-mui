import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { createCategories } from "../../../services/materialCategories";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { schema } from "./validateCategory";

const CreateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const handleSubmitForm = async (data: any) => {
        try {
          const formData = new FormData();
          formData.append("image", data.image[0]);
          formData.append("name", data.name);
          formData.append("price_type", data.price_type);
          // formData.forEach((value, key) => {
          //   console.log(key, value);
          // });
          const response = await createCategories(formData);
          console.log("response vừa gửi  lên", response);
          toast.success("Add category suscess!");

          navigate("/admin/resources/categories");
          reset(); // reset form data
        } catch (error) {
          console.log(error);
          toast.error("Add category false!");
        }
      };
      handleSubmitForm(data);
    }
  }, [loading]);

  const onSubmit = (data: any) => {
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
            multiple={false}
            onChange={handleChangeImage}
          />
          {errors.image && (
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
            <option value="per_metter">per_metter</option>
            <option value="per_quantity">per_quantity</option>
          </select>
        </div>
        <Button className="mt-20 w-40" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateCategory;
