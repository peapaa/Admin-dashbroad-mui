import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// yup
import { createCategoryschema } from "@/pages/Dashbroad/Categories/validateCategory";
import { yupResolver } from "@hookform/resolvers/yup";

// service
import { createCategories } from "@/services/materialCategories";

// type
import { DataCategory } from "@/pages/Dashbroad/Categories/type";

// swr
import { useSWRConfig } from "swr";

//page
import InputImage from "@/pages/Dashbroad/Categories/components/Input/InputImage";
import InputText from "@/pages/Dashbroad/Categories/components/Input/InputText";
import formDataCategory from "@/pages/Dashbroad/Categories/formDataCategory";

// utils
import { GetKeyUrlCategory } from "@/utils/keyCategory";

const CreateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
  console.log("data", data);
  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setData((prev) => ({
        ...prev,
        image: [file],
      }));
    }
  };

  return (
    <div className="bg-white w-full rounded-md p-5 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-10 h-[400px] items-center justify-center"
      >
        <InputImage
          data={data}
          image=""
          register={register}
          handleChangeImage={handleChangeImage}
          errors={errors}
        />
        <InputText register={register} errors={errors} />
      </form>
    </div>
  );
};

export default CreateCategory;
