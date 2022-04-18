import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const repliesRoutes = express.Router();

repliesRoutes.get('/replies', (req, res) => {

  db.manyOrNone('select * from replies')
  .then(data => res.json(data))
  .catch(error => console.log(error));

});
repliesRoutes.get('/replies/:id', (req, res) => {

  db.oneOrNone('select * from replies where id = $(id)', {id: req.params.id})
  .then(data => res.json(data))
  .catch(error => console.log(error));

});

repliesRoutes.get('/repliesbypostid/:post_id', (req, res) => {

  db.manyOrNone('select * from replies where post_id = $(post_id)', {post_id: req.params.post_id})
  .then(data => res.json(data))
  .catch(error => console.log(error));

});

repliesRoutes.post("/create-reply", (req, res) => {

  const newReply = {
    author_id: req.body.author_id,
    message: req.body.message,
    date_created:new Date().toISOString(),
    post_id: req.body.post_id
  }

  db.one(
    "INSERT INTO replies (author_id, message, date_created, post_id) VALUES \
        (${author_id}, ${message}, ${date_created}, ${post_id}) RETURNING id;",
    newReply
  )
    .then((id) => {
      return db.oneOrNone("SELECT * FROM replies WHERE id=${id}", {
        id: id.id,
      });
    })
    .then((reply) => res.json(reply));
});

export default repliesRoutes;