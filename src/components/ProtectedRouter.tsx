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
  const { token, loading, setLoading } = authContext;

  useEffect(() => {
    if (token !== null) {
      setLoading(false);
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, [token, navigate]);

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
