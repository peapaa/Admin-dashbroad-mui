import React from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { Box } from "@mui/material";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const Dashbroad: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Box flex={1}>
          <SideBar />
        </Box>
        <Box flex={5}>{children}</Box>
      </div>
    </div>
  );
};

export default Dashbroad;
