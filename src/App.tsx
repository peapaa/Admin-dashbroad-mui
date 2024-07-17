import { Route, Routes } from "react-router-dom";
import Dashbroad from "./pages/Dashbroad/Dashbroad";
import Content from "./pages/Dashbroad/User/Content";
import Main from "./pages/Dashbroad/Main/Main";
import UserInsight from "./pages/Dashbroad/UserInsight/UserInsight";
import Address from "./pages/Dashbroad/Address/Address";
import Posts from "./pages/Dashbroad/Posts/Posts";
import Purchars from "./pages/Dashbroad/Purchars/Purchars";
import Roles from "./pages/Dashbroad/Roles/Roles";
import Tag from "./pages/Dashbroad/Tags/Tag";
import AdminPage from "./pages/Dashbroad/AdminPage";
function App() {
  return (
    <div className="flex justify-center app">
      <div className="min-w-[1024px] max-w-[1440px] w-full container">
        <Routes>
          <Route path="/" element={<AdminPage />}></Route>
          <Route
            path="/admin/users"
            element={
              <Dashbroad>
                <Content />
              </Dashbroad>
            }
          ></Route>
          <Route
            path="/admin/main"
            element={
              <Dashbroad>
                <Main />
              </Dashbroad>
            }
          ></Route>
          <Route
            path="/admin/user-insights"
            element={
              <Dashbroad>
                <UserInsight />
              </Dashbroad>
            }
          ></Route>
          <Route
            path="/admin/addresses"
            element={
              <Dashbroad>
                <Address />
              </Dashbroad>
            }
          ></Route>
          <Route
            path="/admin/posts"
            element={
              <Dashbroad>
                <Posts />
              </Dashbroad>
            }
          ></Route>
          <Route
            path="/admin/purchases"
            element={
              <Dashbroad>
                <Purchars />
              </Dashbroad>
            }
          ></Route>
          <Route
            path="/admin/roles"
            element={
              <Dashbroad>
                <Roles />
              </Dashbroad>
            }
          ></Route>
          <Route
            path="/admin/tags"
            element={
              <Dashbroad>
                <Tag />
              </Dashbroad>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
