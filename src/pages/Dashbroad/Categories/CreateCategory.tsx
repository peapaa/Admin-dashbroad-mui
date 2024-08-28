import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// mui

// yup
import { yupResolver } from "@hookform/resolvers/yup";

// service
import { createCategories } from "@/services/categoriesService";

// type
import { DataCategory } from "@/pages/Dashbroad/Categories/type";

//page
import formDataCategory from "@/pages/Dashbroad/Categories/formDataCategory";

// utils
import FormActionCategory from "@/pages/Dashbroad/Categories/components/FormAction/FormActionCategory";
import { createCategoryschema } from "@/pages/Dashbroad/Categories/validateCategory";

const CreateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [newImage] = useState<string | null>(null);
  const formMethod = useForm<DataCategory>({
    resolver: yupResolver(createCategoryschema),
    defaultValues: {
      image: [],
      name: "",
      price_type: "",
    },
  });

  // if don't have state data --> don't block case $0.click() double create category

  const onSubmit = useCallback(
    async (data: DataCategory) => {
      setLoading(true);
      try {
        const formData = formDataCategory(data);
        await createCategories(formData);
        toast.success("Add category suscess!");
        navigate("/admin/resources/categories");
      } catch (error) {
        console.log(error);
        toast.error("Add category false!");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
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

export default CreateCategory;
