import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  avatar: { width: 44, height: 44 },
  text: { textOverflow: "ellipsis", overflow: "hidden" },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
}));
function QueuedSongList() {
  const greatherThanMedium = useMediaQuery(theme => theme.breakpoints.up("md"));
  const song = {
    title: "kabira",
    artist: "Kiani Usman",
    thumbnail:
      "https://i1.sndcdn.com/artworks-000056475023-059bpr-t500x500.jpg",
    url: "https://soundcloud.com/kiani-usman-jarry/kabira"
  };

  return (
    greatherThanMedium && (
      <div style={{ margin: "10px 0" }}>
        <Typography variant="button" color="textSecondary">
          Queue(5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, index) => (
          <QueuedSong key={index} song={song} />
        ))}
      </div>
    )
  );
}

function QueuedSong({ song }) {
  const classes = useStyles();
  const { title, artist, thumbnail } = song;
  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={thumbnail} alt="Song thumbnail" />
      <div>
        <Typography className={classes.text} variant="subtitle2">
          {title}
        </Typography>
        <Typography
          className={classes.text}
          variant="body2"
          color={"textSecondary"}
        >
          {artist}
        </Typography>
      </div>
      <IconButton>
        {" "}
        <Delete color="error" />
      </IconButton>
    </div>
  );
}
export default QueuedSongList;
