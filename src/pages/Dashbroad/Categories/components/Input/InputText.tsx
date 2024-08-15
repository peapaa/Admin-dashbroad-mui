import { useNavigate } from "react-router-dom";

// mui
import { Button } from "@mui/material";

// type
import { InputTextProps } from "@/pages/Dashbroad/Categories/type";

const InputText: React.FC<InputTextProps> = ({ register, errors }) => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col gap-5 items-center justify-center shadow-shadowCategory px-20 py-10 rounded-md">
      <div className="">
        <label htmlFor="name">
          Name<span className="text-red-600"> *</span>:
        </label>
        <input
          type="text"
          id="name"
          className="border outline-none rounded-md ml-5 pl-3 h-8 w-[280px]"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="flex items-center flex-col">
        <div>
          <label htmlFor="price_type" className="mr-5">
            Price Type:
          </label>
          <select
            {...register("price_type")}
            className="border outline-none rounded-md px-2 py-1 w-[256px]"
            id="price_type"
          >
            <option value="per_metter">Metter</option>
            <option value="per_quantity">Quantity</option>
          </select>
        </div>
        <div>
          {errors.price_type && (
            <p className="text-red-500 ml-5 mt-2">
              {errors.price_type.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-5">
        <Button
          className="mt-20 w-40"
          type="button"
          style={{ border: "1px solid rgb(187 181 181 / 14%)" }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button className="mt-20 w-40" variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default InputText;
