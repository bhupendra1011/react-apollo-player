import React from "react";
import QueuedSongList from "./QueuedSongList";
import {
  Card,
  makeStyles,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia
} from "@material-ui/core";
import { SkipPrevious, PlayArrow, SkipNext } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px"
  },
  content: {
    flex: "1 0 auto"
  },
  thumbnail: {
    width: 150
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  playIcon: {
    width: 38,
    height: 38
  }
}));
function SongPlayer() {
  const classes = useStyles();
  return (
    <>
      <Card variant="outline" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h5">
              {" "}
              Title
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
              Artist
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious></SkipPrevious>
            </IconButton>
            <IconButton>
              <PlayArrow className={classes.playIcon}></PlayArrow>
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
        <CardMedia
          className={classes.thumbnail}
          image="https://i1.sndcdn.com/artworks-000056475023-059bpr-t500x500.jpg"
        />
      </Card>
      <QueuedSongList />
    </>
  );
}
export default SongPlayer;
