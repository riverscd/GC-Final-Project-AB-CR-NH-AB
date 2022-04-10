import express from "express";
import fetch from "node-fetch";
import pg from "pg-promise";

import { db } from "../index";

const communitiesRoutes = express.Router();

const Joi = require("joi");

const schema = Joi.object({
  community_name: Joi.string()
  .min(2)
  .max(50)
  .required(),

  location: Joi.string()
  .min(1)
  .max(100),

  // posts: Joi.string()
  // .min(1)
  // .max(500)
  // .required(),

  description: Joi.string()
  .min(1)
  .max(500)
  .required(),
});

communitiesRoutes.get("/communities", (req, res) => {
  db.manyOrNone("select * from communities")
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});
communitiesRoutes.get("/communities/:id", (req, res) => {
  db.oneOrNone("select * from communities where id = $(id)", {
    id: req.params.id,
  })
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});

communitiesRoutes.post("/createcommunity", (req, res) => {
  
      const newCommunity = {
        community_name: req.body.community_name,
        location: req.body.location,
        posts: req.body.posts,
        description: req.body.description
      }
      const valid = schema.validate(newCommunity);


    if(valid.error) {
     return res.status(400).send(valid.error)
    }
      db.one(
        "INSERT INTO communities (community_name, location, description ) VALUES \
            (${community_name}, ${location}, ${description} ) RETURNING id;",
        newCommunity
      )
        .then((id) => {
          return db.oneOrNone("SELECT * FROM communities WHERE id=${id}", {
            id: id.id,
          });
        })
        .then((community) => res.json(community));
    });


export default communitiesRoutes;
