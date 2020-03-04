import React from "react";
import Header from "./Header";
import AddSong from "./AddSong";
import SongList from "./SongList";
import SongPlayer from "./SongPlayer";
import { Grid } from "@material-ui/core";

function App() {
	return (
		<>
			<Header />
			<Grid container spacing={3}>
				<Grid item xs={12} md={7}>
					<AddSong />
					<SongList />
				</Grid>
				<Grid item xs={12} md={5}>
					<SongPlayer />
				</Grid>
			</Grid>
		</>
	);
}

export default App;
