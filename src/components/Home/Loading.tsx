import { LoadingProps } from "@/components/type";
import { CircularProgress } from "@mui/material";

const Loading: React.FC<LoadingProps> = ({ className }) => {
  return <CircularProgress className={className} />;
};

export default Loading;
