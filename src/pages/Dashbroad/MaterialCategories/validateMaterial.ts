import { imageCreateCategorySchema } from "@/pages/Dashbroad/Categories/validateCategory";
import * as Yup from "yup";

const partNumberSchema = Yup.string()
  .required("Required part number")
  .max(100, "Part number can be at most 100 characters")
  .min(1, "Name must be at least 1 character");

const nameSchema = Yup.string()
  .nullable()
  .max(255, "Name can be at most 100 characters");

const typeSchema = Yup.number()
  .nullable()
  .typeError("Type must be a number")
  .test("is integer", "Type can't include a decimal point", function (value) {
    if (value) {
      return Number.isInteger(value);
    }
    return true;
  })
  .max(2147483647, "Type can be at most 2147483647 number")
  .min(-2147483648, "Type be at least -2147483648 number");

const largeTitleSchema = Yup.string()
  .required("Required large title")
  .max(500, "Large titler can be at most 100 characters")
  .min(1, "Large title can be at most 100 characters");

const smallTitleSchema = Yup.string()
  .required("Required small title")
  .max(500, "small title can be at most 100 characters")
  .min(1, "Smail title can be at most 100 characters");

const basicPriceSchema = Yup.number()
  .typeError("Basic price must be a number")
  .required("Required basic price")
  .max(2147483647, "Basic price can be at most 2147483647 number")
  .min(0, "Basic price be at least 0 number")
  .test(
    "is integer",
    "Basic price can't include a decimal point",
    function (value) {
      if (value) {
        return Number.isInteger(value);
      }
      return true;
    }
  );

const categorySchema = Yup.string().required("Required category");

const supplierSchema = Yup.string().required("Required supplier");

export const createMaterialSchema = Yup.object().shape({
  image: imageCreateCategorySchema,
  part_number: partNumberSchema,
  name: nameSchema,
  type: typeSchema,
  large_title: largeTitleSchema,
  small_title: smallTitleSchema,
  basic_price: basicPriceSchema,
  category: categorySchema,
  supplier: supplierSchema,
});
