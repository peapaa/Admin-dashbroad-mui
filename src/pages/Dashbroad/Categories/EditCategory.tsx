import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditCategoryschema } from "./validateCategory";
import {
  editCategory,
  getOneCategory,
} from "../../../services/materialCategories";
import { DataCategory } from "./type";
import formDataCategory from "./formDataCategory";

const EditCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataCategory>({
    image: [],
    name: "",
    price_type: "",
  });
  const [newImage, setNewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(EditCategoryschema),
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log("id selected edit", id);
  useEffect(() => {
    const fetchGetOneCategory = async () => {
      try {
        if (id) {
          const response = await getOneCategory(id);
          console.log("response get category", response.data);
          const { name, image, price_type } = response.data;
          setValue("name", name);
          setValue("price_type", price_type);
          setNewImage(image);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGetOneCategory();
  }, [id, setValue]);

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
  useEffect(() => {
    const handleSubmitForm = async (data: DataCategory) => {
      try {
        if (id) {
          const formData = formDataCategory(data);
          const response = await editCategory(formData, id);
          console.log("response of edit category", response);
          toast.success("Edit category suscess!");
          navigate("/admin/resources/categories");
        }
      } catch (error) {
        console.log(error);
        toast.error("Edit category false!");
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      handleSubmitForm(data);
    }
  }, [data, id, loading, navigate]);

  const onSubmit = (data: DataCategory) => {
    setData(data);
    setLoading(true);
  };

  return (
    <div className="bg-white w-full rounded-md p-5 ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
        <div className="">
          {newImage ? (
            <img
              src={newImage}
              alt="image category"
              className="w-[200px] h-[240px] object-cover rounded-lg"
            />
          ) : null}
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

export default EditCategory;
