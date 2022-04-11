import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const eventsRoutes = express.Router();

const Joi = require('joi');


      


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

eventsRoutes.post('/create-event', (req, res) => {
  const schema = Joi.object({
    event_name: Joi.string()
        .min(2)
        .max(50)
        .required(),
  
        description: Joi.string()
        .min(1)
        .max(500)
        .required(),
  
        // event_date: Joi.date()
        // .greater('now')
        // .timestamp('javascript')
        // .iso()
        // .required(),
  
        // posts: Joi.string()
        // .min(1)
        // .max(500),
  
  
        location: Joi.string()
        .min(1)
        .max(100),
  
        address: Joi.string()
        .min(1)
        .max(100),
  
        city: Joi.string()
        .min(1)
        .max(30),
        
        state: Joi.string()
        .min(2)
        .max(2),
  
        // country: Joi.string()
        // .min(1)
        // .max(50),
  
        zip: Joi.string()
        .min(5)
        .max(5),
  
        // attendees: Joi.number()
        // .min(1)
        // .max(200),
  
  })
    const newEvent = { 
      event_name: req.body.event_name,
      description: req.body.description,
      // event_date: req.body.event_date,
      // is_in_person: req.body.is_in_person,
      location: req.body.location,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }
    const valid = schema.validate(newEvent);
console.log(newEvent);

    if(valid.error) {
     return res.status(400).send(valid.error.message)
    }
      db.one(
        "INSERT INTO events (event_name, location, city, state, description, zip, address ) VALUES \
            (${event_name}, ${location}, ${city}, ${state}, ${description}, ${zip}, ${address} ) RETURNING id;",
        newEvent
      )
        .then((id) => {
          return db.oneOrNone("SELECT * FROM events WHERE id=${id}", {
            id: id.id,
          });
        })
        .then((event) => res.json(event));
    });

export default eventsRoutes;
