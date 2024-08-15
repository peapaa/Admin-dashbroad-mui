import * as React from "react";

// mui
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// type
import { InputImageProps } from "@/pages/Dashbroad/Categories/type";

const InputImage: React.FC<InputImageProps> = ({
  data,
  register,
  handleChangeImage,
  errors,
  image,
}) => {
  return (
    <div className="flex flex-col shadow-shadowCategory px-6 py-12 items-center justify-center rounded-md">
      <label
        htmlFor="image"
        className="flex flex-col gap-3 items-center justify-center "
      >
        {(data.image && data.image.length > 0) || image ? (
          <img
            src={image || (data.image && URL.createObjectURL(data.image[0]))}
            alt="image category"
            className="w-[200px] h-[200px] object-cover rounded-lg"
          />
        ) : (
          <CloudUploadIcon sx={{ width: "100px", height: "50px" }} />
        )}
        <p className="mb-2">
          Accept <span className="text-red-600">*</span>: jpg, png, jpeg, svg
        </p>
      </label>
      <input
        type="file"
        {...register("image")}
        id="image"
        className="w-0 h-0 opacity-0"
        accept=".jpg, .png, .jpeg, .svg"
        multiple={false}
        onChange={handleChangeImage}
      />
      {errors.image && data.image?.length === 0 && (
        <p className="text-red-500">{errors.image.message}</p>
      )}
    </div>
  );
};

export default InputImage;
