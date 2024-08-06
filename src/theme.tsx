import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    blueAccent?: {
      main: string;
      secondary: string;
    };
    greenAccent?: {
      main: string;
    };
    textColor?: {
      main: string;
      secondary: string;
      thrid: string;
    };
    backgroundColor?: {
      main: string;
      secondary: string;
    };
    tagColor?: {
      main: string;
      secondary: string;
    };
  }
  interface TypographyVariants {
    customFontSize?: React.CSSProperties["fontSize"];
  }
  interface TypographyVariantsOptions {
    customFontSize?: React.CSSProperties["fontSize"];
  }

  interface PaletteOptions {
    blueAccent?: {
      main: string;
      secondary: string;
    };
    greenAccent?: {
      main: string;
    };
    textColor?: {
      main: string;
      secondary: string;
      thrid: string;
    };
    backgroundColor?: {
      main: string;
      secondary: string;
    };
    tagColor?: {
      main: string;
      secondary: string;
    };
  }
}
const theme = createTheme({
  palette: {
    blueAccent: {
      main: "#00FFC4",
      secondary: "#0EA5E9",
    },
    greenAccent: {
      main: "#22C55E",
    },
    textColor: {
      main: "#64748B",
      secondary: "#CBD5E1",
      thrid: "#f90303",
    },
    backgroundColor: {
      main: "#fff",
      secondary: "#F1F5F9",
    },
    tagColor: {
      main: "#e0d885",
      secondary: "#cbe793",
    },
  },
  typography: {
    subtitle1: {
      fontSize: "1rem",
    },
    subtitle2: {
      fontSize: ".75rem",
    },
    body1: {
      fontSize: ".875rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
    fontFamily: "Nunito Sans",
  },
});

export default theme;
