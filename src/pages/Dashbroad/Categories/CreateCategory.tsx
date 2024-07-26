import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useState } from "react";
const validFileExtensions = {
  image: ["jpg", "png", "jpeg", "svg"],
};

type ValidFileType = keyof typeof validFileExtensions;
function isValidFileType(fileName: string, fileType: ValidFileType) {
  if (!fileName) {
    return false;
  }
  const extension = fileName.split(".").pop() || "";
  return validFileExtensions[fileType]?.includes(extension) ?? false;
}

const MAX_FILE_SIZE = 102400;
const handleSubmitForm = (values: any) => {
  console.log(values);
};
const CreateCategory = () => {
  const schema = Yup.object().shape({
    image: Yup.mixed()
      .required("Required image")
      .test("is-valid-type", "Not a valid image type", (value) => {
        if (value && value instanceof File) {
          return isValidFileType(value.name.toLowerCase(), "image");
        }
        return false;
      })
      .test("is-valid-size", "Max allowed size is 100KB", (value) => {
        if (value && value instanceof File) {
          return value && value?.size <= MAX_FILE_SIZE;
        }
        return false;
      }),
    categoryname: Yup.string()
      .required("Required category name")
      .max(255, "name max character 255")
      .min(1, "name min character 1"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const [selectedOption, setSelectedOption] = useState(1);
  console.log("setSelectedOption", selectedOption);
  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="bg-white w-full rounded-md p-5 ">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-5 "
      >
        <div className="">
          <label htmlFor="image" className="mr-5">
            Image:
          </label>
          <input type="file" {...register("image")} id="image" name="image " />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div className="">
          <label htmlFor="categoryname">Name:</label>
          <input
            type="text"
            id="categoryname"
            className="border outline-none rounded-md ml-5 pl-3 h-8"
            {...register("categoryname")}
          />
          {errors.categoryname && (
            <p className="text-red-500">{errors.categoryname.message}</p>
          )}
        </div>
        <div className="flex items-center ">
          <label id="custom-dropdown-label" className="mr-5">
            Price Type:
          </label>
          <Select
            labelId="custom-dropdown-label"
            value={selectedOption}
            onChange={handleChange}
            label="Custom Dropdown"
            input={<OutlinedInput label="Custom Dropdown" />}
            className="w-[180px] h-10 "
          >
            <MenuItem value={1}>per_metter</MenuItem>
            <MenuItem value={2}>per_quantity</MenuItem>
          </Select>
        </div>
        <div className=""></div>
        <Button className="mt-20 w-40" variant="contained" type="submit">
          Submit
        </Button>

        <div className=""></div>
      </form>
    </div>
  );
};

export default CreateCategory;
