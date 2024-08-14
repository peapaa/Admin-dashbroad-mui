import InputImage from "@/pages/Dashbroad/Categories/components/Input/InputImage";
import InputText from "@/pages/Dashbroad/Categories/components/Input/InputText";
import { editCategoryschema } from "@/pages/Dashbroad/Categories/validateCategory";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  editCategory,
  getOneCategory,
} from "../../../services/materialCategories";
import formDataCategory from "./formDataCategory";
import { DataCategory } from "./type";

const EditCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataCategory>({
    image: [],
    name: "",
    price_type: "",
  });
  const [newImage, setNewImage] = useState<string | null>(null);
  console.log("data", data);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DataCategory>({
    resolver: yupResolver(editCategoryschema),
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchGetOneCategory = async () => {
      try {
        if (id) {
          const response = await getOneCategory(id);
          console.log("response get category", response.data);
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

  const onSubmit: SubmitHandler<DataCategory> = (data) => {
    setData(data);
    setLoading(true);
  };

  return (
    <div className="bg-white w-full rounded-md p-5 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-10 h-[400px] items-center justify-center"
      >
        <InputImage
          image={newImage}
          data={data}
          register={register}
          handleChangeImage={handleChangeImage}
          errors={errors}
        />
        <InputText register={register} errors={errors} />
      </form>
    </div>
  );
};

export default EditCategory;
