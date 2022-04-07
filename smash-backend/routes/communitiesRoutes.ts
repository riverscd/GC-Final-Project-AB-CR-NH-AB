import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const communitiesRoutes = express.Router();

const Joi = require('joi');

const schema = Joi.object({
    community_name: Joi.string()
        .min(2)
        .max(50)
        .required(),

    location: Joi.string()
        .min(1)
        .max(100),

    posts: Joi.string()
        .min(1)
        .max(500)
        .required(),

    description: Joi.string()
        .min(1)
        .max(500)
        .required(),

})

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