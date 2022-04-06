import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const communitiesRoutes = express.Router();

communitiesRoutes.get('/communities', (req, res) => {

  db.manyOrNone('select * from communities')
  .then(data => res.json(data))
  .catch(error => console.log(error));

})
communitiesRoutes.get('/communities/:id', (req, res) => {

  db.oneOrNone('select * from communities where id = $(id)', {id: req.params.id})
  .then(data => res.json(data))
  .catch(error => console.log(error));

})

export default communitiesRoutes;