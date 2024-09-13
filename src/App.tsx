//router
import { Navigate, Route, Routes } from "react-router-dom";

//component
import ProtectedRouter from "./components/Home/ProtectedRouter";

//page
import Categories from "@/pages/Dashbroad/Categories/Categories";
import Dashbroad from "@/pages/Dashbroad/Dashbroad";
import Main from "@/pages/Dashbroad/Main/Main";
import MarterialCategories from "@/pages/Dashbroad/MaterialCategories/MarterialCategories";
import Tag from "@/pages/Dashbroad/Tags/Tag";
import Login from "@/pages/Registration/Login";

function App() {
  return (
    <div className="flex justify-center app bg-backgroundColor ">
      <div className="min-w-[1024px] max-w-[1440px] border w-full container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRouter>
                <Dashbroad />
              </ProtectedRouter>
            }
          >
            <Route
              path="dashbroad/main"
              element={
                <ProtectedRouter>
                  <Main />
                </ProtectedRouter>
              }
            />
            <Route
              path="resources/tags"
              element={
                <ProtectedRouter>
                  <Tag />
                </ProtectedRouter>
              }
            />
            <Route
              path="resources/categories/*"
              element={
                <ProtectedRouter>
                  <Categories />
                </ProtectedRouter>
              }
            />
            <Route
              path="resources/material-categories/*"
              element={
                <ProtectedRouter>
                  <MarterialCategories />
                </ProtectedRouter>
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
