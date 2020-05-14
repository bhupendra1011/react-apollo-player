import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutation";

const useStyles = makeStyles((theme) => ({
  avatar: { width: 44, height: 44 },
  text: { textOverflow: "ellipsis", overflow: "hidden" },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));
function QueuedSongList({ queue }) {
  console.log(queue);
  const greatherThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  return (
    greatherThanMedium && (
      <div style={{ margin: "10px 0" }}>
        <Typography variant="button" color="textSecondary">
          Queue({queue.length})
        </Typography>
        {queue.map((song, index) => (
          <QueuedSong key={index} song={song} />
        ))}
      </div>
    )
  );
}

function QueuedSong({ song }) {
  const classes = useStyles();
  const { title, artist, thumbnail } = song;
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  function handleAddorRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  }
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
      <IconButton onClick={handleAddorRemoveFromQueue}>
        {" "}
        <Delete color="error" />
      </IconButton>
    </div>
  );
}
export default QueuedSongList;
