import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import songReducer from "./reducer";

export const SongContext = React.createContext({
  song: {
    id: "472a6d6a-a665-4804-9dd6-583ff31690ba",
    title: "kabira",
    artist: "Kiani Usman",
    thumbnail:
      "https://i1.sndcdn.com/artworks-000056475023-059bpr-t500x500.jpg",
    duration: 150,
    url: "https://soundcloud.com/kiani-usman-jarry/kabira",
  },
  isPlaying: false,
});

function App() {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);
  const greatherThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const greatherThanSmall = useMediaQuery((theme) =>
    theme.breakpoints.up("sm")
  );
  return (
    <>
      <SongContext.Provider value={{ state, dispatch }}>
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
                    bottom: "0",
                  }
            }
            item
            xs={12}
            md={5}
          >
            <SongPlayer />
          </Grid>
        </Grid>
      </SongContext.Provider>
    </>
  );
}

export default App;
