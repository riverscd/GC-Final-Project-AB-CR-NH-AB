import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const characterRoutes = express.Router();

characterRoutes.get('/characters', (req, res) => {

  db.manyOrNone('select * from characters')
  .then(data => res.json(data))
  .catch(error => console.log(error));

})
characterRoutes.get('/characters/:id', (req, res) => {

  db.oneOrNone('select * from characters where id = $(id)', {id: req.params.id})
  .then(data => res.json(data))
  .catch(error => console.log(error));

})

export default characterRoutes;



