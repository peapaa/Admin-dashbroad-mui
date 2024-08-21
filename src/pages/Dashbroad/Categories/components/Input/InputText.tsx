// type
import { InputTextProps } from "@/pages/Dashbroad/Categories/type";

const InputText: React.FC<InputTextProps> = ({ value, onChange, error }) => {
  return (
    <div className="">
      <label htmlFor="name">
        Name<span className="text-red-600"> *</span>:
      </label>
      <input
        type="text"
        id="name"
        value={value}
        className="border outline-none rounded-md ml-5 pl-3 h-8 w-[280px]"
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InputText;
