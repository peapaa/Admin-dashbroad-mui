import { Route, Routes } from "react-router-dom";
import Dashbroad from "./pages/Dashbroad/Dashbroad";
import Content from "./pages/Dashbroad/UserManager/Content";
import Main from "./pages/Dashbroad/Main/Main";
import UserInsight from "./pages/Dashbroad/UserInsight/UserInsight";
import Address from "./pages/Dashbroad/Address/Address";
import Posts from "./pages/Dashbroad/Posts/Posts";
import Purchars from "./pages/Dashbroad/Purchars/Purchars";
import Roles from "./pages/Dashbroad/Roles/Roles";
import Tag from "./pages/Dashbroad/Tags/Tag";
import Login from "./pages/Registration/Login";
import ProtectedRouter from "./components/ProtectedRouter";
function App() {
  return (
    <div className="flex justify-center app">
      <div className="min-w-[1024px] max-w-[1440px] w-full container">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/admin"
            element={
              <ProtectedRouter>
                <Dashbroad />
              </ProtectedRouter>
            }
          >
            <Route
              path="users"
              element={
                <ProtectedRouter>
                  <Content />
                </ProtectedRouter>
              }
            />
            <Route
              path="main"
              element={
                <ProtectedRouter>
                  <Main />
                </ProtectedRouter>
              }
            />
            <Route
              path="user-insights"
              element={
                <ProtectedRouter>
                  <UserInsight />
                </ProtectedRouter>
              }
            />
            <Route
              path="addresses"
              element={
                <ProtectedRouter>
                  <Address />
                </ProtectedRouter>
              }
            />
            <Route
              path="posts"
              element={
                <ProtectedRouter>
                  <Posts />
                </ProtectedRouter>
              }
            />
            <Route
              path="purchases"
              element={
                <ProtectedRouter>
                  <Purchars />
                </ProtectedRouter>
              }
            />
            <Route
              path="roles"
              element={
                <ProtectedRouter>
                  <Roles />
                </ProtectedRouter>
              }
            />
            <Route
              path="tags"
              element={
                <ProtectedRouter>
                  <Tag />
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
