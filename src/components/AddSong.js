import React from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles
} from "@material-ui/core";
import { Link, AddBoxOutlined } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  urlInput: {
    margin: theme.spacing(1)
  },
  addSongButton: {
    margin: theme.spacing(1)
  },

  dialog: {
    textAlign: "center"
  },
  thumbnail: {
    width: "90%"
  }
}));

function AddSong() {
  const [dialog, setOpen] = React.useState(false);
  const handleDialogClose = () => setOpen(false);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src="https://cdn-images-1.medium.com/max/1200/1*yDnqkp49pwGu7Ezy1sRc5w.png"
            alt="sample "
            className={classes.thumbnail}
          />

          <TextField margin="dense" name="title" label="Title" fullWidth />
          <TextField margin="dense" name="artist" label="Artist" fullWidth />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="primary">
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        margin="normal"
        type="url"
        fullWidth
        className={classes.urlInput}
        placeholder="Add youtube or soundcloud url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          )
        }}
      ></TextField>
      <Button
        className={classes.addSongButton}
        onClick={() => setOpen(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        {" "}
        Add
      </Button>
    </div>
  );
}
export default AddSong;
