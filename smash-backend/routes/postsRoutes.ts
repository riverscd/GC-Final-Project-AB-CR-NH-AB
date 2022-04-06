import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const postsRoutes = express.Router();

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

export default postsRoutes;