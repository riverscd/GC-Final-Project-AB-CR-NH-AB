import { Box, Button, createTheme, Grid, Modal, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Post, Posts } from "../models/posts";
import { AddPost, GetAllPosts } from "../services/posts";


export function GeneralMessageBoard() {

  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<any>([]);
  //create post modal
  const [postTitle, setPostTitle] = useState<any>("");
  const [postMessage, setPostMessage] = useState<any>("");

  //create post modal open & close
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //create post modal styling
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function refreshPage() {
    window.location.reload();
  }

  //create post 
  function handleSubmit(e: any) {
    e.preventDefault();
    AddPost(
      postTitle,
      postMessage
    ).then((newPost) => {
      if (newPost) {
        handleClose();
        refreshPage();
      }
    });
  };

  useEffect(() => {
    GetAllPosts().then((data: any) => {
      setAllPosts(data);
    });
    console.log("hi")
  }, []);

  //reply button
  function handleClick() {
    navigate("/post")
  }
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>

      <Grid
        item
        xs={12}
        // sm={8}
        component={Paper}
        elevation={6}
        sx={{
          py: 2,
        }}
      >
        <div>
          <h1>General Message Board</h1>
          <Box sx={{
              m: 2,
            }}>
            <Link to="/sitenav">Home</Link>
          </Box>

          {/* Create Post Modal  */}
          <Button
            sx={{
              m: 2,
            }}
            variant="outlined"
            onClick={handleOpen}>Create Post</Button>
          <Modal
            open={open}
            onClose={handleClose}

          >
            <Box sx={style}>
              <Typography id="modal-title" variant="h6" component="h2">
                Create Post
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="post_title"
                label="Title"
                name="post_title"
                autoFocus
                onChange={(e) => setPostTitle(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="post_message"
                label="Message"
                name="post_message"
                onChange={(e) => setPostMessage(e.target.value)}
              />
              <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
            </Box>
          </Modal>

          {/* All Posts Display */}
          {allPosts.map((post: Post) => (
            <div className="message">
              <ul>
                <li
                  key={post.id}
                ><Link to="/post" > {`post title: ${post.post_title}`}</Link></li>
                <li>{`post author: ${post.author_id}`}</li>
                <li>{`post message: ${post.post_message}`}</li>
                <li>{`post date: ${post.date_created}`}</li>
                <li># of replies</li>
                <button onClick={handleClick}>reply</button>
              </ul>
            </div>
          ))}
        </div>
      </Grid>
    </ThemeProvider>


  )
}