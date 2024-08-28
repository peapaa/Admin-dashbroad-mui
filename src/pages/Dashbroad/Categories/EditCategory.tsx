import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// yup
import { yupResolver } from "@hookform/resolvers/yup";

// page
import formDataCategory from "@/pages/Dashbroad/Categories/formDataCategory";
import { DataCategory } from "@/pages/Dashbroad/Categories/type";
import { editCategoryschema } from "@/pages/Dashbroad/Categories/validateCategory";

// service
import FormActionCategory from "@/pages/Dashbroad/Categories/components/FormAction/FormActionCategory";
import { editCategory, getOneCategory } from "@/services/categoriesService";

const EditCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [newImage, setNewImage] = useState<string | null>(null);

  const formMethod = useForm<DataCategory>({
    resolver: yupResolver(editCategoryschema),
  });
  const { setValue } = formMethod;

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

  const onSubmit = useCallback(
    async (data: DataCategory) => {
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
    <FormActionCategory
      formMethod={formMethod}
      onSubmit={onSubmit}
      loading={loading}
      newImage={newImage}
    />
  );
};

export default EditCategory;
