import { Box, Button, Card, CardContent, createTheme, Grid, Modal, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Post, Reply } from "../models/posts";
import { GetPostById } from "../services/posts";
import { AddReply, GetRepliesByPost } from "../services/replies";


export function PostBoard() {

  const navigate = useNavigate();
  const location = useLocation();
  const post: any = location.state;
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [allReplies, setAllReplies] = useState<Reply[]>([]);
  const { loggedInUser } = useContext(UserContext);

  //create post modal
  const [replyMessage, setReplyMessage] = useState<any>("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    GetPostById(post.post.id).then((data: any) => {
      setSelectedPost(data);
    });
    GetRepliesByPost(post.post.id).then((data: any) => {
      setAllReplies(data);
    });
  }, []);

  //create post 
  function handleSubmit(e: any) {
    e.preventDefault();
    AddReply(
      loggedInUser?.id,
      replyMessage,
      post.post.id
    ).then((newReply) => {
      if (newReply) {
        handleClose();
        setAllReplies([...allReplies, newReply]);
      };
    });
  };

  function handleNav(){
    navigate("/generalmessageboard")
  }

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
  };
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
              Post and Replies
            </Typography>
            <Button
            sx={{
              m: 2,
              borderRadius:1
            }}
            variant="outlined"
            onClick={handleNav}>Back to Message Board</Button>
            </Box>
            
        
          
          <Box
            sx={{
              mx: 5,
              
            }}
          >
          <Card
            variant="outlined"
            sx={{ mb: 1,
              borderRadius:2 }}>

            <CardContent>
              <Typography variant="body1" color="text.secondary">
                <ul>
                  <li className="title">{`${selectedPost?.post_title}`}</li>
                  <li className="list-item">{`Author: ${selectedPost?.author_id}`}</li>
                  <li className="list-item">{`Date: ${selectedPost?.date_created}`}</li>
                  <li className="list-item">{`Message: ${selectedPost?.post_message}`}</li>
                </ul>
                <Button
                  sx={{ m: 2,
                  borderRadius:1 }}
                  size="small"
                  variant="outlined"
                  onClick={handleOpen}>Reply</Button>
              </Typography>
            </CardContent>
          </Card>
          {/* Create Post Modal  */}
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <Typography
                id="modal-title"
                variant="h5"
                component="h2"
                sx={{ display: "flex", justifyContent: "center" }}>
                Reply
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="reply_message"
                label="Message"
                name="reply_message"
                onChange={(e) => setReplyMessage(e.target.value)}
              />
              <Button variant="outlined"  sx={{borderRadius:1}} onClick={handleSubmit}>Submit</Button>
            </Box>
          </Modal>
          </Box>

          <Box
            sx={{
              mx: 10,
        
            }}
          >
          
            {allReplies.map((reply: Reply) => (
              <Card
                variant="outlined"
                sx={{ mb: 1,
                  borderRadius:2 }}>

                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    <ul>
                      <li
                        key={reply.id}
                        className="title"
                      >{`Author: ${reply.author_id}`}</li>
                      <li className="list-item">{`Date: ${reply.date_created}`}</li>
                      <li className="list-item">{`Message: ${reply.message}`}</li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

        </Box>
      </Grid>
    </ThemeProvider>
  )
}