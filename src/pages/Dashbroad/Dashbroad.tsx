import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Home/Header";
import SideBar from "../../components/Home/SideBar";

const Dashbroad: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex min-h-[calc(100vh-60px)]">
        <Box flex={1}>
          <SideBar />
        </Box>
        <Box flex={5}>
          <Outlet />
        </Box>
      </div>
    </div>
  );
};

export default Dashbroad;
