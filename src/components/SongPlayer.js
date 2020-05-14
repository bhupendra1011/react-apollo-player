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
import { useQuery } from "@apollo/react-hooks";
import { GET_QUEUED_SONGS } from "../graphql/queries";

import ReactPlayer from "react-player";

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
  const { data } = useQuery(GET_QUEUED_SONGS);
  const [played, setPlayed] = React.useState(0);
  const [seeking, setSeeking] = React.useState(false);
  const [playedSeconds, setPlayedSeconds] = React.useState(0);
  const { state, dispatch } = React.useContext(SongContext);
  const classes = useStyles();

  const reactPlayerRef = React.useRef();

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleProgressChange(e, newValue) {
    setPlayed(newValue);
  }
  function handleSeekingStart() {
    setSeeking(true);
  }
  function handleSeekingEnd() {
    setSeeking(false);
    reactPlayerRef.current.seekTo(played);
  }
  function formatDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
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
              {formatDuration(playedSeconds)}
            </Typography>
          </div>
          <Slider
            onMouseDown={handleSeekingStart}
            onMouseUp={handleSeekingEnd}
            onChange={handleProgressChange}
            value={played}
            type="range"
            min={0}
            max={1}
            step={0.1}
          />
        </div>
        <ReactPlayer
          ref={reactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            // dont progress while seeking song
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
          url={state.song.url}
          playing={state.isPlaying}
          hidden
        />
        <CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
      </Card>
      <QueuedSongList queue={data.queue} />
    </>
  );
}
export default SongPlayer;
