import { ReactNode } from "react";
import { User } from "../pages/Registration/Login";
import { Navigate } from "react-router-dom";
interface protectedRouter {
  children: ReactNode;
}
const ProtectedRouter: React.FC<protectedRouter> = ({ children }) => {
  const data = sessionStorage.getItem("UserCurrent");
  const user: User | null = data ? JSON.parse(data) : null;
  if (user?.role === "admin") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRouter;
