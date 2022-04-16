import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const postsRoutes = express.Router();

// const Joi = require('joi');

// const schema = Joi.object({
//     replies: Joi.string()
//         .min(1)
//         .max(200),

//     date_: Joi.date().greater('now').timestamp('javascript').iso(),
        

    

// })

postsRoutes.get('/posts', (req, res) => {

  db.manyOrNone('select * from posts')
  .then(data => res.json(data))
  .catch(error => console.log(error));

})
postsRoutes.get('/posts/:id', (req, res) => {

  db.oneOrNone('select * from posts where id = $(id)', {id: req.params.id})
  .then(data => res.json(data))
  .catch(error => console.log(error));

})

postsRoutes.post("/create-post", (req, res) => {

  const newPost = {
    author_id: req.body.author_id,
    post_title: req.body.post_title,
    post_message: req.body.post_message,
    date_created:new Date().toISOString()
    // posts: req.body.posts,
    
  }
  // const validPost = postSchema.validate(newPost);

  // console.log(newPost);
  // console.log(new Date().toISOString())
  
// if(validCommunity.error) {
//  return res.status(400).send(validCommunity.error)
// }
  db.one(
    "INSERT INTO posts (author_id, post_title, post_message, date_created) VALUES \
        (${author_id}, ${post_title}, ${post_message}, ${date_created}) RETURNING id;",
    newPost
  )
    .then((id) => {
      return db.oneOrNone("SELECT * FROM posts WHERE id=${id}", {
        id: id.id,
      });
    })
    .then((post) => res.json(post));
});


export default postsRoutes;