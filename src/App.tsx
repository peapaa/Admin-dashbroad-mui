import { Route, Routes } from "react-router-dom";
import Dashbroad from "./pages/Dashbroad/Dashbroad";
import Content from "./pages/Dashbroad/User/Content";
function App() {
  return (
    <div className="flex justify-center app">
      <div className="min-w-[1024px] max-w-[1440px] w-full container">
        <Routes>
          <Route
            path="/admin/users"
            element={
              <Dashbroad>
                <Content />
              </Dashbroad>
            }
          ></Route>
          {/* <Route path="/" element={<Dashbroad />}></Route> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
