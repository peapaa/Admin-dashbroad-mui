//router
import { Navigate, Route, Routes } from "react-router-dom";

//component
import ProtectedRouter from "./components/Home/ProtectedRouter";

//page
import Address from "@/pages/Dashbroad/Address/Address";
import Categories from "@/pages/Dashbroad/Categories/Categories";
import Dashbroad from "@/pages/Dashbroad/Dashbroad";
import Main from "@/pages/Dashbroad/Main/Main";
import MarterialCategories from "@/pages/Dashbroad/MaterialCategories/MarterialCategories";
import Posts from "@/pages/Dashbroad/Posts/Posts";
import Purchars from "@/pages/Dashbroad/Purchars/Purchars";
import Roles from "@/pages/Dashbroad/Roles/Roles";
import Tag from "@/pages/Dashbroad/Tags/Tag";
import UserInsight from "@/pages/Dashbroad/UserInsight/UserInsight";
import Content from "@/pages/Dashbroad/UserManager/Content";
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
              path="dashbroad/user-insights"
              element={
                <ProtectedRouter>
                  <UserInsight />
                </ProtectedRouter>
              }
            />
            <Route
              path="resources/users"
              element={
                <ProtectedRouter>
                  <Content />
                </ProtectedRouter>
              }
            />
            <Route
              path="resources/addresses"
              element={
                <ProtectedRouter>
                  <Address />
                </ProtectedRouter>
              }
            />
            <Route
              path="resources/posts"
              element={
                <ProtectedRouter>
                  <Posts />
                </ProtectedRouter>
              }
            />
            <Route
              path="resources/purchases"
              element={
                <ProtectedRouter>
                  <Purchars />
                </ProtectedRouter>
              }
            />
            <Route
              path="resources/roles"
              element={
                <ProtectedRouter>
                  <Roles />
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
