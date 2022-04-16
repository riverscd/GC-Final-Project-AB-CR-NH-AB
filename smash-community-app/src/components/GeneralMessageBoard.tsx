import { Box, Button, createTheme, Grid, Modal, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
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
  const [foundUser, setFoundUser] = useState<User>();

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
            
            // setFoundUser( allUsers.find((user: User) =>  {user.id === post.author_id} ))
            //  return (

            <div className="message">
              <ul>
                <li
                  key={post.id}
                ><Link to="/post" > {`post title: ${post.post_title}`}</Link></li>
                <li>{`post author: ${foundUser?.username}`}</li>
                <li>{`post message: ${post.post_message}`}</li>
                <li>{`post date: ${post.date_created}`}</li>
                <li># of replies</li>
                {/* <button onClick={handleClick}>reply</button> */}
              </ul>
            </div>
             
          
          ))}
        </div>
      </Grid>
    </ThemeProvider>


  )
}