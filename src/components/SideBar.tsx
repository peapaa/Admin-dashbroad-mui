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
import { dashboardList, resourcesList } from "../utils/data";

const Item = ({ title, to }: { title: string; to: string }) => {
  const theme = useTheme();
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <ListItemButton
      component={Link}
      to={to}
      sx={{
        paddingLeft: "48px",
        color: isActive
          ? `${theme.palette.blueAccent?.secondary}`
          : `${theme.palette.textColor?.main}`,
      }}
    >
      <Typography
        sx={{
          fontWeight: isActive ? "bold" : "normal",
        }}
      >
        {title}
      </Typography>
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
    <Box className="lg:w-[180px] xl:w-[240px]">
      <Box className="lg:pl-0 xl:pl-4">
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
                {dashboardList.map((dashboardListItem) => (
                  <Item
                    title={dashboardListItem.title}
                    to={dashboardListItem.href}
                  />
                ))}
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
                  {resourcesList.map((resourcesListItem) => (
                    <Item
                      title={resourcesListItem.title}
                      to={resourcesListItem.href}
                    />
                  ))}
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
