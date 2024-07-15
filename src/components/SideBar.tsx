import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { Box, Collapse, List, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import dashbroadLogo from "../assets/images/sidebar-logo/view-grid.svg";
import resourceLogo from "../assets/images/sidebar-logo/Vector.svg";

const Item = ({ title, to }: { title: string; to: string }) => {
  const theme = useTheme();
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <ListItemButton
      sx={{
        paddingLeft: "48px",
        color: isActive
          ? `${theme.palette.blueAccent?.secondary}`
          : `${theme.palette.textColor?.main}`,
      }}
    >
      <Link to={to}>
        <Typography
          sx={{
            fontWeight: isActive ? "bold" : "normal",
          }}
        >
          {title}
        </Typography>
      </Link>
    </ListItemButton>
  );
};
const SideBar: React.FC = () => {
  const [open1, setOpen1] = React.useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const [open2, setOpen2] = React.useState(true);

  const handleClick2 = () => {
    setOpen2(!open2);
  };
  return (
    <Box
      sx={{
        maxWidth: "240px",
        minWidth: "200px",
      }}
    >
      {/* <Routes><Route path="/main" element={<Main/>}></Route></Routes> */}
      <Box pl={4}>
        <Box>
          <ListItemButton onClick={handleClick1} sx={{ width: "100%" }}>
            <ListItemIcon sx={{ minWidth: 0, marginRight: "8px" }}>
              <img
                src={dashbroadLogo}
                alt="dashbroadLogo"
                style={{ width: "24px", height: "24px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Dashbroad"
              primaryTypographyProps={{
                fontSize: "16px",
                color: "#64748B",
              }}
            />

            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemText
                sx={{
                  pl: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Item title="Main" to="/main" />
                <Item title="User Insights" to="/user-insights" />
              </ListItemText>
            </List>
          </Collapse>
        </Box>
        <Box>
          <Box>
            <ListItemButton onClick={handleClick2} sx={{ width: "100%" }}>
              <ListItemIcon sx={{ minWidth: 0, marginRight: "8px" }}>
                <img
                  src={resourceLogo}
                  alt="resourceLogo"
                  style={{ width: "24px", height: "24px" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Resources"
                primaryTypographyProps={{ fontSize: "16px", color: "#64748B" }}
              />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemText
                  sx={{
                    pl: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Item title="Addresses" to="/addresses" />
                  <Item title="Posts" to="/posts" />
                  <Item title="Purchases" to="/purchases" />
                  <Item title="Roles" to="/roles" />
                  <Item title="Tags" to="/tags" />
                  <Item title="Users" to="/users" />
                </ListItemText>
              </List>
            </Collapse>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
