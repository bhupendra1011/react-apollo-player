import { createMuiTheme } from "@material-ui/core";
import { lightBlue, teal } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: teal,
    secondary: lightBlue,
  },
});

export default theme;
