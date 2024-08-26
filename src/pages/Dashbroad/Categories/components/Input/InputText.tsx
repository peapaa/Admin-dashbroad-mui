// type
import { InputTextProps } from "@/pages/Dashbroad/Categories/type";
import { Box } from "@mui/material";

const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  error,
  typeInput,
}) => {
  return (
    <Box component="div" className="">
      <input
        type={typeInput}
        id="name"
        value={value}
        className="border outline-none rounded-md ml-5 pl-3 h-8 w-[280px] "
        onChange={(e) => onChange(e.target.value)}
      />
      <Box component="div" className="h-5">
        {error && <p className="text-red-500 ml-5 h-5">{error}</p>}
      </Box>
    </Box>
  );
};

export default InputText;
