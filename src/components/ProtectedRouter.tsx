import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
interface protectedRouter {
  children: ReactNode;
}
const ProtectedRouter: React.FC<protectedRouter> = ({ children }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { token } = authContext;

  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRouter;
