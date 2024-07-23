import { ReactNode, useContext, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(true);
  // const tokenLocalStorage = localStorage.getItem("token");
  // let getTokenAccessLocalStorage = null;
  // if (tokenLocalStorage) {
  //   getTokenAccessLocalStorage = JSON.parse(tokenLocalStorage).access;
  // }
  // console.log("getTokenAccessLocalStorage", getTokenAccessLocalStorage);
  useEffect(() => {
    if (token !== null) {
      setLoading(false);
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
