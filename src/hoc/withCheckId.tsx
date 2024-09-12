import React from "react";

// hoc
import { WithCheckIdProps } from "@/hoc/type";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withCheckId<T extends WithCheckIdProps>(
  Component: React.ComponentType<T>
) {
  return (props: T) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/");
    const basePath = path.slice(0, -2).join("/");
    React.useEffect(() => {
      if (!id) {
        navigate(basePath || "/admin/resources/categories");
      }
    }, [id, navigate, basePath]);
    return <Component {...props} id={id} />; // check id version 2
  };
}

export default withCheckId;
