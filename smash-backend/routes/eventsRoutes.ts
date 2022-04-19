import express from "express";
import fetch from "node-fetch";
import pg from "pg-promise";

import { db } from "../index";

const eventsRoutes = express.Router();

const Joi = require("joi");

eventsRoutes.get("/events", (req, res) => {
  db.manyOrNone("select * from events")
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});

eventsRoutes.get("/events/:id", (req, res) => {
  db.oneOrNone("select * from events where id = $(id)", { id: req.params.id })
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});

eventsRoutes.get("/events/bycreator/:creator_id", (req, res) => {
  return db
    .manyOrNone("select * from events where creator_id = $(creator_id)", {
      creator_id: req.params.creator_id,
    })
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});

eventsRoutes.get("/events/bystate/:state", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  return db
    .manyOrNone("select * from events where state = $(state)", {
      state: req.params.state,
    })
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});

eventsRoutes.post("/events/selectEvents", (req: any, res: any) => {
  return db
    .manyOrNone("SELECT * FROM events WHERE id IN ($1:csv);", [
      req.body.added_event_ids,
    ])
    .then((events) => res.json(events));
});

eventsRoutes.post("/create-event", (req, res) => {
  const schema = Joi.object({
    event_name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(1).max(500).required(),
    event_date: Joi.date().greater("now").required(),
    location: Joi.string().min(1).max(100),
    address: Joi.string().min(1).max(100),
    city: Joi.string().min(1).max(30),
    state: Joi.string().min(2).max(2),
    zip: Joi.string().min(5).max(5),
    creator_id: Joi.number().required(),
  });
  const newEvent = {
    event_name: req.body.event_name,
    description: req.body.description,
    event_date: req.body.event_date,
    location: req.body.location,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    creator_id: req.body.creator_id,
  };
  const valid = schema.validate(newEvent);
  console.log(newEvent);

  if (valid.error) {
    return res.status(400).send(valid.error.message);
  }
  db.one(
    "INSERT INTO events (event_name, event_date, location, city, state, description, zip, address, creator_id ) VALUES \
            (${event_name}, ${event_date}, ${location}, ${city}, ${state}, ${description}, ${zip}, ${address}, ${creator_id} ) RETURNING id;",
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
