import { ButtonFormProps } from "@/components/type";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ButtonForm: React.FC<ButtonFormProps> = ({ loading }) => {
  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-center gap-5 ">
      <Button
        className="mt-20 w-40"
        type="button"
        style={{ border: "1px solid rgb(187 181 181 / 14%)" }}
        onClick={() => {
          if (localStorage.getItem("redirectPath")) {
            navigate("/admin/resources/categories");
            localStorage.removeItem("redirectPath");
          } else {
            navigate(-1);
          }
        }}
      >
        Back
      </Button>
      <Button
        className="mt-20 w-40"
        variant="contained"
        type="submit"
        disabled={loading}
      >
        Submit
      </Button>
    </div>
  );
};

export default ButtonForm;
