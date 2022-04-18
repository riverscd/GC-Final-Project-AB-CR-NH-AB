import express from "express";
import { number } from "joi";
import fetch from "node-fetch";
import pg from "pg-promise";

import { db } from "../index";

const communitiesRoutes = express.Router();

const Joi = require("joi");



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

communitiesRoutes.get("/communities/bylocation/:location", (req, res) => {
  console.log(req.params)
  return db.manyOrNone("select * from communities where location = $(location)", {location: req.params.location})
    .then((data) => res.json(data))
    .catch((error) => console.log(error))
})

communitiesRoutes.get("/communities/bycreator/:creator_id", (req, res) => {
  return db.manyOrNone("select * from communities where creator_id = $(creator_id)", {creator_id: req.params.creator_id})
  .then((data) => res.json(data))
  .catch((error) => console.log(error))
})

communitiesRoutes.post("/create-community", (req, res) => {

  const communitySchema = Joi.object({
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

    creator_id: Joi.number()
    .required()
  });
  
      const newCommunity = {
        community_name: req.body.community_name,
        location: req.body.location,
        // posts: req.body.posts,
        description: req.body.description,
        creator_id!: req.body.creator_id
      }
      console.log(newCommunity.creator_id)
      const validCommunity = communitySchema.validate(newCommunity);

      console.log(newCommunity);


    if(validCommunity.error) {
     return res.status(400).send(validCommunity.error)
    }
      db.one(
        "INSERT INTO communities (community_name, location, description, creator_id ) VALUES \
            (${community_name}, ${location}, ${description}, ${creator_id} ) RETURNING id;",
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
