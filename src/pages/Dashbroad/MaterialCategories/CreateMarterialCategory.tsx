import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// pages
import FormActionMaterial from "@/pages/Dashbroad/MaterialCategories/components/form/FormActionMaterial";
import formDataMaterial from "@/pages/Dashbroad/MaterialCategories/components/form/formDataMaterial";
import { MarterialCategoriesProps } from "@/pages/Dashbroad/MaterialCategories/type";
import { createMaterialSchema } from "@/pages/Dashbroad/MaterialCategories/validateMaterial";
// service
import { createMaterialCategory } from "@/services/marterialCategoriesService";
// yup
import { yupResolver } from "@hookform/resolvers/yup";

const CreateMarterialCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [newImage] = useState<string | null>(null);

  const formMethod = useForm<MarterialCategoriesProps>({
    resolver: yupResolver(createMaterialSchema),
    defaultValues: {
      image: [],
      part_number: "",
      large_title: "",
      small_title: "",
      basic_price: 0,
      category: "",
      supplier: "",
    },
  });

  const onSubmit = useCallback(
    async (data: MarterialCategoriesProps) => {
      setLoading(true);
      try {
        const formData = formDataMaterial(data);
        await createMaterialCategory(formData);
        toast.success("Add Material category suscess!");
        navigate("/admin/resources/material-categories");
      } catch (error) {
        console.log(error);
        toast.error("Add material category false!");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return (
    <FormActionMaterial
      onSubmit={onSubmit}
      formMethod={formMethod}
      newImage={newImage}
      loading={loading}
    />
  );
};

export default CreateMarterialCategory;
