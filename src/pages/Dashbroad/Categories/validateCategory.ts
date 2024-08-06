import * as Yup from "yup";
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

const MAX_FILE_SIZE = 5; // 5MB
export const schema = Yup.object().shape({
  image: Yup.mixed()
    .test("is-required-or-exists", "Required image", function (value) {
      const { createError } = this;
      if (!value) {
        return createError({ message: "Required image" });
      }
      return true; // Valid if either new image or existing image is provided.
    })
    .test("is-valid-type", "Not a valid image type", function (value) {
      const files = value as FileList;
      if (files && files.length > 0) {
        const file = files[0];
        return isValidFileType(file.name.toLowerCase(), "image");
      }
      return this.createError({ message: "Required image" });
    })
    .test(
      "is-valid-size",
      `Max allowed size is ${MAX_FILE_SIZE}MB`,
      function (value) {
        const files = value as FileList;
        if (files && files.length > 0) {
          const file = files[0];
          return file.size <= MAX_FILE_SIZE * 1024 * 1024;
        }
        return this.createError({ message: "Required image" });
      }
    ),
  name: Yup.string()
    .required("Required category name")
    .max(255, "Name can be at most 255 characters")
    .min(1, "Name must be at least 1 character"),
  price_type: Yup.string().required("Price type is required"),
});
