import { ButtonClearSearchProps } from "@/components/type";
import useSearchQuery from "@/hooks/useSearchQuery";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { IconButton } from "@mui/material";

const ButtonClearSearch: React.FC<ButtonClearSearchProps> = ({ reset }) => {
  const { handleResetSearch } = useSearchQuery();
  return (
    <IconButton
      onClick={() => {
        reset();
        handleResetSearch();
      }}
    >
      <SearchOffIcon className="text-gray-400" />
    </IconButton>
  );
};

export default ButtonClearSearch;
