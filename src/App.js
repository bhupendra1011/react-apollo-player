import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";

function App() {
  const greatherThanMedium = useMediaQuery(theme => theme.breakpoints.up("md"));
  const greatherThanSmall = useMediaQuery(theme => theme.breakpoints.up("sm"));
  return (
    <>
      <Hidden only="xs">
        <Header />
      </Hidden>

      <Grid
        style={{ paddingTop: greatherThanSmall ? 80 : 10 }}
        container
        spacing={3}
      >
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greatherThanMedium
              ? { position: "fixed", top: "70px", right: "0", width: "100%" }
              : {
                  position: "fixed",
                  width: "100%",
                  left: "0",
                  bottom: "0"
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
