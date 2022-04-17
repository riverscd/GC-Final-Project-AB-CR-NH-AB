import { Box, Button, createTheme, Grid, Modal, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Reply } from "../models/posts";
import { AddReply, GetAllReplies, GetRepliesByPost } from "../services/replies";


export function PostBoard(){

  //notes for thoughts on how to make this work
  // click post, pull replies where post.id === replies.post_id we're in
  // pass post id as a prop??
  // pass entire post as a prop and get all replies where id = whatever
  // map out replies order by created date should by default be chron.
  // adding a reply mimics adding a posts
  // when a reply is added, update post.replies[] w/ id of reply? 
  // to track # of replies

  const location = useLocation();
  const post: any = location.state;
  const [allReplies, setAllReplies] = useState<Reply[]>([]);
  const { loggedInUser } = useContext(UserContext);

  //create post modal
  const [replyMessage, setReplyMessage] = useState<any>("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //pull all replies
  useEffect(() => {
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

    ).then((newReply) => {
      if (newReply) {
        handleClose();
        setAllReplies([...allReplies, newReply])
      }
    });
  };

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
        <Box sx={{
          m: 2,
        }}>
          <Link to="/generalmessageboard">Back to Message Board</Link>
        </Box>
        {/* Create Post Modal  */}
        <Button
          sx={{
            m: 2,
          }}
          variant="outlined"
          onClick={handleOpen}>Reply</Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
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
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
          </Box>
        </Modal>



        {allReplies.map((reply: Reply) => (
          // setFoundUser( allUsers.find((user: User) =>  {user.id === post.author_id} ))
          //  return (

          <div className="message">
            <ul>
              <li
                key={reply.id}
              >{`reply message: ${reply.message}`}</li>
              <li>{`reply date: ${reply.date_created}`}</li>
            </ul>
          </div>

        ))}

      </Grid>
    </ThemeProvider>
  )
}