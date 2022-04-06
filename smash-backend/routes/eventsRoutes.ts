import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const eventsRoutes = express.Router();

eventsRoutes.get('/events', (req, res) => {

  db.manyOrNone('select * from events')
  .then(data => res.json(data))
  .catch(error => console.log(error));

})

eventsRoutes.get('/events/:id', (req, res) => {

  db.oneOrNone('select * from events where id = $(id)', {id: req.params.id})
  .then(data => res.json(data))
  .catch(error => console.log(error));

})

export default eventsRoutes;
