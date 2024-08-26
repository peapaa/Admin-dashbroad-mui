import { SelectOptionProps } from "@/pages/Dashbroad/Categories/type";

const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  error,
  onChange,
  optionValues,
  id,
}) => {
  return (
    <div className="flex items-center flex-col">
      <div>
        <select
          className="border outline-none rounded-md px-2 py-1 w-[280px] truncate"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {optionValues.map((optionValues, index) => (
            <option
              value={optionValues.value}
              key={index}
              className="w-[280px] truncate"
            >
              {optionValues.option}
            </option>
          ))}
        </select>
      </div>
      <div className="h-5">
        {error && <p className="text-red-500 ml-5 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default SelectOption;
