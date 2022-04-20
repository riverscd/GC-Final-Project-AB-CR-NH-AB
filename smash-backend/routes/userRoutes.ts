import express from "express";
import { db } from "../index";
import bcrypt from "bcrypt";

const saltRounds = 10;

const userRoutes = express.Router();

const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().min(5).max(10).required(),
  password: Joi.string().min(8).max(30),
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  email: Joi.string(),
  //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  birthdate: Joi.date().greater("1-2-1903").less("now"),
  // city: Joi.string().min(2).max(100),
  // state: Joi.string().min(2).max(2),
  // country: Joi.string().min(4).max(56),
  // zip: Joi.string().min(5).max(5),
});

userRoutes.get("/users", (req, res) => {
  db.manyOrNone(
    "SELECT id, email, username, first_name, last_name, birthdate, city, state, country, zip, bio, added_community_ids, added_event_ids, main_character, secondary_characters, slippi_usernames FROM users"
  )
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});
userRoutes.get("/users/:id", (req, res) => {
  db.oneOrNone(
    "SELECT id, email, username, first_name, last_name, birthdate, city, state, country, zip, bio, added_community_ids, added_event_ids, main_character, secondary_characters, slippi_usernames FROM users WHERE id = $(id)",
    { id: req.params.id }
  )
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});
userRoutes.get("/users/:username", (req, res) => {
  db.oneOrNone(
    "SELECT id, email, username, first_name, last_name, birthdate, city, state, country, zip, bio, added_community_ids, added_event_ids, main_character, secondary_characters, slippi_usernames FROM users WHERE username = $(username)",
    {
      id: req.params.username,
    }
  )
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});

userRoutes.post("/signup", (req, res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const newUser = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        birthdate: req.body.birthdate,
      };
      console.log(newUser);

      const valid = signupSchema.validate(newUser);

      if (valid.error) {
        return res.status(400).send(valid.error);
      }
      newUser.password = hash;
      db.one(
        "INSERT INTO users ( username, password, first_name, last_name, email, birthdate ) VALUES \
            ( ${username}, ${password}, ${first_name}, ${last_name}, ${email}, ${birthdate} ) RETURNING id;",
        newUser
      )
        .then((id) => {
          return db.oneOrNone("SELECT * FROM users WHERE id=${id}", {
            id: id.id,
          });
        })
        .then((user) => res.json(user));
    });
  });
});

const loginSchema = Joi.object({
  username: Joi.string().min(5).max(30).required(),
  password: Joi.string().min(8).max(20),
});

userRoutes.post("/login", (req, res) => {
  const userLoginInput = {
    username: req.body.username,
    password: req.body.password,
  };
  const validLogin = loginSchema.validate(userLoginInput);
  if (validLogin.error) {
    return res.status(400).send(validLogin.error);
  }
  db.oneOrNone(
    "SELECT id, email, username, password, first_name, last_name, birthdate, city, state, country, zip, bio, added_community_ids, added_event_ids, main_character, secondary_characters, slippi_usernames FROM users WHERE username = $(username)",
    { username: req.body.username }
  ).then((userCredentials) => {
    if (!userCredentials) {
      return res.status(401).send("Invalid Username or password");
    }
    if (
      !bcrypt.compareSync(userLoginInput.password, userCredentials.password)
    ) {
      return res.status(401).send("Invalid Username or Password");
    }
    res.status(200).json(userCredentials);
  });
});

userRoutes.put("/users/:id", (req: any, res: any) => {
  const updatedUserValues = {
    id: req.params.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    bio: req.body.bio,
    main_character: req.body.main_character,
    secondary_characters: req.body.secondary_characters,
    slippi_usernames: req.body.slippi_usernames,
  };
  db.oneOrNone(
    "UPDATE users SET (first_name, last_name, country, state, city, bio, main_character, secondary_characters, slippi_usernames) = \
  (${first_name}, ${last_name}, ${country}, ${state}, ${city}, ${bio}, ${main_character}::smallint[], ${secondary_characters}::smallint[], ${slippi_usernames}::varchar(20)[]) WHERE id = ${id} \
  RETURNING id, username, first_name, last_name, country, state, city, bio, main_character, secondary_characters, slippi_usernames;",
    updatedUserValues
  ).then((updatedUser) => {
    if (updatedUser) {
      return res.json(updatedUser);
    } else {
      return res.status(400);
    }
  });
});

userRoutes.put("/user/:id/addEvent", (req: any, res: any) => {
  const eventToAdd = {
    id: req.params.id,
    added_event_ids: req.body.added_event_ids,
  };

  db.oneOrNone(
    "UPDATE users SET added_event_ids = ARRAY_APPEND(added_event_ids, ${added_event_ids}) WHERE id = ${id} RETURNING id, username, added_event_ids;",
    eventToAdd
  ).then((updatedUser) => {
    if (updatedUser) {
      return res.json(updatedUser);
    } else {
      return res.status(400);
    }
  });
});

userRoutes.put("/user/:id/addCommunity", (req: any, res: any) => {
  console.log(req.body.added_community_ids);
  const communityToAdd = {
    id: req.params.id,
    added_community_ids: req.body.added_community_ids,
  };
  db.oneOrNone(
    "UPDATE users SET added_community_ids = ARRAY_APPEND(added_community_ids, ${added_community_ids}) WHERE id = ${id} RETURNING id, username, added_community_ids;",
    communityToAdd
  ).then((updatedUser) => {
    if (updatedUser) {
      return res.json(updatedUser);
    } else {
      return res.status(400);
    }
  });
});

export default userRoutes;
