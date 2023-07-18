import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
      primary: {
        main: "#4F1D76",
        // light: main값을 통해 계산됨
  	    // dark: main값을 통해 계산됨
        // contrastText: main값을 통해 계산됨
      },
    }
});

export default theme;