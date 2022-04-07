import express from "express";
import fetch from 'node-fetch';
import pg from 'pg-promise';


import { db } from "../index"

const userRoutes = express.Router();



userRoutes.get('/users', (req, res) => {

  db.manyOrNone('select * from users')
  .then(data => res.json(data))
  .catch(error => console.log(error));

})
userRoutes.get('/users/:id', (req, res) => {

  db.oneOrNone('select * from users where id = $(id)', {id: req.params.id})
  .then(data => res.json(data))
  .catch(error => console.log(error));

})

userRoutes.post("/users", (req: any, res: any) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        birthdate: req.body.birthdate,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zip: req.body.zip,
        user_profile_img: req.body.user_profile_img,
        bio: req.body.bio,
        main_character: req.body.main_character,
        secondary_character: req.body.secondary_character,
        slippi_usernames: req.body.slippi_usernames
    }
    // const valid = schema.validate(newUser);

    // if(valid.error) {
    //    return res.status(400).send(valid.error)
    // }

    db.oneOrNone("insert into user (username, password, first_name, last_name, email, birthdate, city, state, country, zip, user_profile_img, bio, main_character, secondary_character, slippi_usernames) values ($(username), $(password), $(first_name), $(last_name), $(email), $(birthdate), $(city), $(state), $(country), $(zip), $(user_profile_img), $(bio), $(main_character), $(secondary_character), $(slippi_usernames) returning id", 
    newUser)

    .then (id => {
        db.one("select * from users where id = $(id)", {id: id.id})
        .then((todo) => res.json(todo)
    );
    })
    .catch(error => res.status(500).send(error))
})

export default userRoutes;