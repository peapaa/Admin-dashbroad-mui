import React from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Dashbroad: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex">
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
