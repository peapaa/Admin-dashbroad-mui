import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

// context
import AuthContext from "@/context/AuthContext";

interface protectedRouter {
  children: ReactNode;
}
const ProtectedRouter: React.FC<protectedRouter> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  console.log("location", location.pathname);
  if (!authContext) {
    return null;
  }
  const { token } = authContext;

  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

export default ProtectedRouter;
