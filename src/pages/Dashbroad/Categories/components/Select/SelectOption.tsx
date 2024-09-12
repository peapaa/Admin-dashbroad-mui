import ErrorText from "@/components/ErrorText/ErrorText";
import { SelectOptionProps } from "@/pages/Dashbroad/Categories/type";
import { FormControl, MenuItem, Select } from "@mui/material";

const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  error,
  onChange,
  optionValues,
  id,
}) => {
  return (
    <div className="flex flex-col w-full ">
      <div className="w-full ">
        <FormControl className="w-full ">
          <Select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            displayEmpty
            id={id}
            sx={{
              "& .MuiSelect-select": {
                padding: "6px 8px",
              },
            }}
          >
            <MenuItem value="">
              <em>Select option</em>
            </MenuItem>
            {optionValues.map((optionValues) => (
              <MenuItem value={optionValues.value}>
                {optionValues.option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <ErrorText error={error} />
    </div>
  );
};

export default SelectOption;
