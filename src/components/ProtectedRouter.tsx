import { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
interface protectedRouter {
  children: ReactNode;
}
const ProtectedRouter: React.FC<protectedRouter> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  if (!authContext) {
    return null;
  }
  const { token } = authContext;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token !== null) {
      setLoading(false);
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRouter;
