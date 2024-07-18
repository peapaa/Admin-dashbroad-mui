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
            <Route path="users" element={<Content />} />
            <Route path="main" element={<Main />} />
            <Route path="user-insights" element={<UserInsight />} />
            <Route path="addresses" element={<Address />} />
            <Route path="posts" element={<Posts />} />
            <Route path="purchases" element={<Purchars />} />
            <Route path="roles" element={<Roles />} />
            <Route path="tags" element={<Tag />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
