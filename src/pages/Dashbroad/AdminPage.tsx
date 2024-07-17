import { Box } from "@mui/material";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

const AdminPage = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Box flex={1}>
          <SideBar />
        </Box>
        <Box flex={5}>AdminPage</Box>
      </div>
    </div>
  );
};

export default AdminPage;
