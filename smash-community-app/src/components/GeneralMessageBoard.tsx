import { Box, Button, Card, CardContent, createTheme, Grid, Modal, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Post, Posts } from "../models/posts";
import { User } from "../models/users";
import { AddPost, GetAllPosts } from "../services/posts";
import { GetAllUsers } from "../services/users";


export function GeneralMessageBoard() {

  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<any>([]);
  const { loggedInUser } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState<User[]>([]);



  //create post modal
  const [postTitle, setPostTitle] = useState<any>("");
  const [postMessage, setPostMessage] = useState<any>("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //pull all messages
  useEffect(() => {
    GetAllUsers().then((data: any) => {
      setAllUsers(data);
    });
    GetAllPosts().then((data: any) => {
      setAllPosts(data);
    });
    console.log("hi")
  }, []);

  //create post 
  function handleSubmit(e: any) {
    e.preventDefault();
    AddPost(
      loggedInUser?.id,
      postTitle,
      postMessage
    ).then((newPost) => {
      if (newPost) {
        handleClose();
        setAllPosts([...allPosts, newPost])
      }
    });
  };

  

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
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
    display: "flex",
    flexDirection: "column",
    borderRadius: 3
  };

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
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center"
            }}>
            <Typography component="h1" variant="h5"
            >
              General Message Board
            </Typography>


            {/* Create Post Modal  */}
            <Button
              sx={{
                m: 2,
                borderRadius: 1
              }}
              variant="outlined"
              onClick={handleOpen}>Create Post</Button>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}

          >
            <Box sx={style}

            >
              <Typography
                id="modal-title"
                variant="h5"
                component="h2"
                sx={{ 
                  display: "flex", 
                  justifyContent: "center",
                 }}>
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
              <Button
                sx={{
                  mt: 1,
                  borderRadius: 1
                }}
                variant="outlined"
                onClick={handleSubmit}
              >Submit
              </Button>
            </Box>
          </Modal>
          <Box
            sx={{
              mx: 5,
              mb: 5
            }}>
            {/* All Posts Display */}
            <ul>
            {allPosts.map((post: Post) => (
              <Card
                variant="outlined"
                sx={{ mb: 1 ,
                  borderRadius: 2}}>

                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                   
                      <li
                        key={post.id}
                      ><Link to='/post' state={{ post: post }} className="title"> {`${post.post_title}`}</Link></li>
                      <li className="list-item">{`Author: ${post.author_id}`}</li>
                      <li className="list-item">{`Message: ${post.post_message}`}</li>
                      <li className="list-item">{`Date: ${post.date_created}`}</li>
                      <li className="list-item">{`Replies: ${post.replies?.length}`}</li>

                   

                  </Typography>
                </CardContent>
              </Card>
            ))}
             </ul>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider >


  )
}