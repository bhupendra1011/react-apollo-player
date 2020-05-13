import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { Link, AddBoxOutlined } from "@material-ui/icons";
import ReactPlayer from "react-player";
import { ADD_SONG } from "../graphql/mutation";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },

  dialog: {
    textAlign: "center",
  },
  thumbnail: {
    width: "90%",
  },
}));

const DEFAULT_SONG = {
  duration: 0,
  title: "",
  artist: "",
  thumbnail: "",
};

function AddSong() {
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [url, setUrl] = useState("");
  const [dialog, setOpen] = useState(false);
  const [playable, setPlayable] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG);

  useEffect(() => {
    const isPlayable = ReactPlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  function handleChangeSong(e) {
    const { name, value } = e.target;
    setSong((prevSong) => ({ ...prevSong, [name]: value }));
  }

  const handleDialogClose = () => setOpen(false);

  async function handledEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundcloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  }

  async function handleAddSong() {
    try {
      const { url, thumbnail, duration, title, artist } = song;
      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
      });
      handleDialogClose();
      setSong(DEFAULT_SONG);
      setUrl("");
    } catch (e) {
      console.log("error occured while adding song...");
    }
  }

  function getSoundcloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  }
  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  }

  const classes = useStyles();
  function handleError(field) {
    return error?.graphQLErrors[0]?.extensions?.path.includes(field);
  }
  const { thumbnail, title, artist } = song;
  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img src={thumbnail} alt="sample " className={classes.thumbnail} />

          <TextField
            value={title}
            margin="dense"
            name="title"
            label="Title"
            error={handleError("title")}
            helperText={handleError("title") && "Fill out field"}
            fullWidth
            onChange={handleChangeSong}
          />
          <TextField
            value={artist}
            margin="dense"
            name="artist"
            error={handleError("artist")}
            helperText={handleError("artist") && "Fill out field"}
            label="Artist"
            fullWidth
            onChange={handleChangeSong}
          />
          <TextField
            value={thumbnail}
            margin="dense"
            name="thumbnail"
            error={handleError("thumbnail")}
            helperText={handleError("thumbnail") && "Fill out field"}
            label="Thumbnail"
            fullWidth
            onChange={handleChangeSong}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="primary" onClick={handleAddSong}>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        margin="normal"
        type="url"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className={classes.urlInput}
        placeholder="Add youtube or soundcloud url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      ></TextField>
      <Button
        disabled={!playable}
        className={classes.addSongButton}
        onClick={() => setOpen(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        {" "}
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handledEditSong} />
    </div>
  );
}
export default AddSong;
