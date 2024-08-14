import * as React from "react";

import { InputImageProps } from "@/pages/Dashbroad/Categories/type";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const InputImage: React.FC<InputImageProps> = ({
  data,
  register,
  handleChangeImage,
  errors,
  image,
}) => {
  return (
    <div className="flex flex-col gap-3 shadow-shadowCategory px-6 py-12 items-center justify-center rounded-md">
      <label
        htmlFor="image"
        className="mr-5 flex flex-col gap-3 items-center justify-center"
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
        <p>
          Accept <span className="text-red-600">*</span>: jpg, png, jpeg, svg
        </p>
      </label>
      <input
        type="file"
        {...register("image")}
        id="image"
        // style={{ visibility: "hidden" }}
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
