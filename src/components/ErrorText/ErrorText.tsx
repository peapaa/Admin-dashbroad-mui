import { ErrorTextProps } from "@/components/type";

const ErrorText: React.FC<ErrorTextProps> = ({ error }) => {
  return <>{error && <p className="text-red-500 ">{error}</p>}</>;
};

export default ErrorText;
