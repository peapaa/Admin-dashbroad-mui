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

const nameSchema = Yup.string()
  .required("Required category name")
  .max(255, "Name can be at most 255 characters")
  .min(1, "Name must be at least 1 character");

const priceTypeSchema = Yup.string().required("Price type is required");

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

const imageEditCategorySchema = Yup.mixed()
  .nullable()
  .test("is-valid-type", "Not a valid image type", function (value) {
    const files = value as File[];
    console.log("files", files);
    if (!files || files.length === 0) return true;
    if (files && files.length > 0) {
      const file = files[0];
      return isValidFileType(file.name);
    }
    return true;
  })
  .test(
    "is-valid-size",
    `Max allowed size is ${MAX_FILE_SIZE}MB`,
    function (value) {
      const files = value as File[];
      if (!files || files.length === 0) return true;
      if (files && files.length > 0) {
        console.log("files", files);
        const file = files[0];
        return file.size <= MAX_FILE_SIZE * 1024 * 1024;
      }
      return true;
    }
  );

export const createCategoryschema = Yup.object().shape({
  image: imageCreateCategorySchema,
  name: nameSchema,
  price_type: priceTypeSchema,
});

export const editCategoryschema = Yup.object().shape({
  image: imageEditCategorySchema,
  name: nameSchema,
  price_type: priceTypeSchema,
});
