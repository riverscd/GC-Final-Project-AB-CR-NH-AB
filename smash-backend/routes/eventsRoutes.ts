import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const eventsRoutes = express.Router();

const Joi = require('joi');

const schema = Joi.object({
  event_name: Joi.string()
      .min(5)
      .max(50)
      .required(),

      description: Joi.string()
      .min(1)
      .max(500)
      .required(),

      event_date: Joi.date().greater('now').timestamp('javascript').iso()
              .required(),

      posts: Joi.string()
      .min(1)
      .max(500)
      .required(),


      location: Joi.string()
      .min(1)
      .max(100),

      address: Joi.string()
      .min(1)
      .max(100),

      city: Joi.string()
      .min(2)
      .max(2),

      country: Joi.string()
      .min(1)
      .max(50),

      zip: Joi.string()
      .min(5)
      .max(5),

      attendees: Joi.number()
      .min(1)
      .max(200),

})
      


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
