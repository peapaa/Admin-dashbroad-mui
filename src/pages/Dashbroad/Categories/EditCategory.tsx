import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { editCategory, getOneCategory } from "@/services/materialCategories";

// utils
import { useGetUrlCategory } from "@/hooks/useKeyCategory";

//swr
import useSearchQuery from "@/hooks/useSearchQuery";
import { useSWRConfig } from "swr";

const EditCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { url } = useGetUrlCategory();
  const { mutate } = useSWRConfig();
  const { searchText, page } = useSearchQuery();
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
  } = useForm<DataCategory>({
    resolver: yupResolver(editCategoryschema),
  });

  useEffect(() => {
    const fetchGetOneCategory = async () => {
      try {
        if (id) {
          const response = await getOneCategory(id);
          const { name, image, price_type } = response.data;
          console.log("response.data", response.data);
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
    }
  };
  useEffect(() => {
    const handleSubmitForm = async (data: DataCategory) => {
      try {
        if (id) {
          const formData = formDataCategory(data);
          await editCategory(formData, id);
          // await mutate(url, async () => {
          //   await getAllCategories(url);
          // });
          toast.success("Edit category suscess!");
          navigate(-1);
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
  }, [data, id, url, loading, mutate, navigate, searchText, page]);

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
