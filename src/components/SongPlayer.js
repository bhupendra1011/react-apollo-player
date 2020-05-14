import React from "react";
import QueuedSongList from "./QueuedSongList";
import {
  Card,
  makeStyles,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
} from "@material-ui/core";
import { SkipPrevious, PlayArrow, SkipNext, Pause } from "@material-ui/icons";
import { SongContext } from "../App";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px",
  },
  content: {
    flex: "1 0 auto",
  },
  thumbnail: {
    width: 150,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  playIcon: {
    width: 38,
    height: 38,
  },
}));
function SongPlayer() {
  const { state, dispatch } = React.useContext(SongContext);
  const classes = useStyles();

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }
  return (
    <>
      <Card variant="outline" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h5">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
              {state.song.artist}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious></SkipPrevious>
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon}></PlayArrow>
              )}
            </IconButton>
            <IconButton>
              <SkipNext></SkipNext>
            </IconButton>
            <Typography variant="subtitle1" color="textSecondary" component="p">
              00:01:30
            </Typography>
          </div>
          <Slider type="range" min={0} max={1} step={0.1} />
        </div>
        <CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
      </Card>
      <QueuedSongList />
    </>
  );
}
export default SongPlayer;
