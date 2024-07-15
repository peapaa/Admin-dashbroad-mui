import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Content from "../components/MainContent/Content";
import { Box } from "@mui/material";

const Dashbroad: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Box flex={1}>
          <SideBar />
        </Box>
        <Box flex={5}>
          <Content />
        </Box>
      </div>
    </div>
  );
};

export default Dashbroad;
