import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const repliesRoutes = express.Router();

repliesRoutes.get('/replies', (req, res) => {

  db.manyOrNone('select * from replies')
  .then(data => res.json(data))
  .catch(error => console.log(error));

})
repliesRoutes.get('/replies/:id', (req, res) => {

  db.oneOrNone('select * from replies where id = $(id)', {id: req.params.id})
  .then(data => res.json(data))
  .catch(error => console.log(error));

})

export default repliesRoutes;