import { Route, Routes } from "react-router-dom";
import Dashbroad from "./pages/Dashbroad";
import Content from "./components/MainContent/Content";
function App() {
  return (
    <div className="flex justify-center app">
      <div className="min-w-[1024px] max-w-[1440px] w-full ">
        <Routes>
          <Route
            path="/users"
            element={
              <Dashbroad>
                <Content />
              </Dashbroad>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
