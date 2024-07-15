import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import chart from "../../assets/images/content-logo/chart-bar.svg";

import { styled } from "@mui/system";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 8,
  marginTop: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#22C55E",
  },
}));

const UserInfo = () => {
  const theme = useTheme();
  const [day, setDay] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  };
  return (
    <div className="w-full flex gap-4">
      <Box
        flex={1}
        sx={{
          backgroundColor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.body1,
              fontWeight: "bold",
              color: theme.palette.textColor?.main,
            }}
          >
            Current Users
          </Typography>

          <FormControl
            sx={{ width: 88, height: 24 }}
            className="form-slecet-day"
          >
            <Select value={day} onChange={handleChange} displayEmpty>
              <MenuItem value="" sx={{ fontSize: 12, color: "#64748B" }}>
                30 Days
              </MenuItem>
              <MenuItem value={10} sx={{ fontSize: 12, color: "#64748B" }}>
                10 Days
              </MenuItem>
              <MenuItem value={20} sx={{ fontSize: 12, color: "#64748B" }}>
                20 Days
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.blueAccent?.secondary,
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              margin: "12px 0",
            }}
          >
            <img src={chart} alt="chart" />
          </Box>
          <Typography
            sx={{
              fontSize: 36,
              marginLeft: "12px",
              color: "#64748B",
            }}
          >
            7
          </Typography>
        </Box>
      </Box>
      <Box
        flex={1}
        sx={{
          backgroundColor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.body1,
              fontWeight: "bold",
              color: theme.palette.textColor?.main,
            }}
          >
            New Users
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.body1,

              color: theme.palette.textColor?.main,
            }}
          >
            15k
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: 36,
              color: "#64748B",
            }}
          >
            75%
          </Typography>
          <BorderLinearProgress variant="determinate" value={75} />
        </Box>
      </Box>
      <Box flex={1}></Box>
    </div>
  );
};

export default UserInfo;
