import { SelectOptionProps } from "@/pages/Dashbroad/Categories/type";

const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  error,
  onChange,
}) => {
  return (
    <div className="flex items-center flex-col">
      <div>
        <label htmlFor="price_type" className="mr-5">
          Price Type:
        </label>
        <select
          className="border outline-none rounded-md px-2 py-1 w-[256px]"
          id="price_type"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="per_metter">Metter</option>
          <option value="per_quantity">Quantity</option>
        </select>
      </div>
      <div>{error && <p className="text-red-500 ml-5 mt-2">{error}</p>}</div>
    </div>
  );
};

export default SelectOption;
