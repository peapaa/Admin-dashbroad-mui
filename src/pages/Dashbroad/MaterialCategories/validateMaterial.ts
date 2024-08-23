import * as Yup from "yup";

const validFileExtensions = {
  image: ["jpg", "png", "jpeg", "svg"],
};

function isValidFileType(fileName: string) {
  if (!fileName) {
    return false;
  }
  const extension = fileName.split(".").pop() || "";
  return validFileExtensions.image?.includes(extension) ?? false;
}
const MAX_FILE_SIZE = 5; // 5MB

const imageCreateCategorySchema = Yup.mixed()
  .test("is-required-or-exists", "Required image", function (value) {
    const { createError } = this;
    const files = value as File[];
    if (!files || files.length === 0) {
      return createError({ message: "Required image" });
    }
    return true;
  })
  .test("is-valid-type", "Not a valid image type", function (value) {
    const files = value as File[];
    if (files && files.length > 0) {
      const file = files[0];
      const isValid = isValidFileType(file.name.toLowerCase());
      if (!isValid) {
        return this.createError({ message: "Not a valid image type" });
      }
    }
    return true;
  })
  .test(
    "is-valid-size",
    `Max allowed size is ${MAX_FILE_SIZE}MB`,
    function (value) {
      const files = value as File[];
      if (files && files.length > 0) {
        const file = files[0];
        return file.size <= MAX_FILE_SIZE * 1024 * 1024;
      }
      return this.createError({ message: "Required image" });
    }
  );
