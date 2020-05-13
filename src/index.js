import React from "react";
import ReactDOM from "react-dom";

import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/client";

import theme from "./theme";
import App from "./App";

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
