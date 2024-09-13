import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// components
import Loading from "@/components/Home/Loading";
// pages
import FormActionMaterial from "@/pages/Dashbroad/MaterialCategories/components/form/FormActionMaterial";
import formDataMaterial from "@/pages/Dashbroad/MaterialCategories/components/form/formDataMaterial";
import { MarterialCategoriesProps } from "@/pages/Dashbroad/MaterialCategories/type";
import { editMaterialSchema } from "@/pages/Dashbroad/MaterialCategories/validateMaterial";
// service
import {
  getOneMaterial,
  updateMaterial,
} from "@/services/marterialCategoriesService";
// yup
import withCheckId from "@/hoc/withCheckId";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const EditMaterialCategory = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState<string | null>(null);

  const formMethod = useForm<MarterialCategoriesProps>({
    resolver: yupResolver(editMaterialSchema),
    defaultValues: {
      image: [],
      part_number: "",
      name: "",
      type: 0,
      large_title: "",
      small_title: "",
      basic_price: 0,
      category: "",
      supplier: "",
    },
  });

  const { setValue } = formMethod;

  // const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetcGetOneMaterial = async () => {
      setLoading(true);
      try {
        if (id) {
          const response = await getOneMaterial(id);
          const {
            image,
            part_number,
            name,
            type,
            large_title,
            small_title,
            basic_price,
            category,
            supplier,
          } = response.data;

          console.log("response: ", response.data);
          setNewImage(image);
          setValue("part_number", part_number);
          if (name) {
            setValue("name", name);
          }
          if (type) {
            setValue("type", type);
          }
          setValue("large_title", large_title);
          setValue("small_title", small_title);
          setValue("basic_price", basic_price);
          setValue("category", category);
          setValue("supplier", supplier);
        }
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetcGetOneMaterial();
  }, [id, setValue]);

  const onSubmit = async (data: MarterialCategoriesProps) => {
    const formData = formDataMaterial(data);
    setLoading(true);
    try {
      if (id) {
        await updateMaterial(formData, id);
        toast.success("updated material successfully");
        if (localStorage.getItem("redirectPath")) {
          navigate("/admin/resources/material-categories");
          localStorage.removeItem("redirectPath");
        } else {
          navigate(-1);
        }
      }
    } catch (error) {
      console.error("error", error);
      if (axios.isAxiosError(error)) {
        const partNumber = error.response?.data?.part_number;
        if (partNumber && partNumber.length > 0) {
          toast.error("Already part number!");
        } else toast.error("Add material category false!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Box className="w-full h-full">
          <Box className="flex items-center justify-center h-screen">
            <Loading />
          </Box>
        </Box>
        ;
      </>
    );
  }

  return (
    <FormActionMaterial
      formMethod={formMethod}
      onSubmit={onSubmit}
      newImage={newImage}
      loading={loading}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default withCheckId(EditMaterialCategory);
