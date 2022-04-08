import express from "express";
import { db } from "../index";
import bcrypt from "bcrypt";
import { Body } from "node-fetch";
import { User } from "../Models/users";

const saltRounds = 10;

const userRoutes = express.Router();

userRoutes.get("/users", (req, res) => {
  db.manyOrNone("SELECT * FROM users")
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});
userRoutes.get("/users/:id", (req, res) => {
  db.oneOrNone("SELECT * FROM users WHERE id = $(id)", { id: req.params.id })
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});

// userRoutes.post("/users", (req: any, res: any) => {
//   const newUser = {
//     username: req.body.username,
//     password: req.body.password,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     birthdate: req.body.birthdate,
//     city: req.body.city,
//     state: req.body.state,
//     country: req.body.country,
//     zip: req.body.zip,
//     user_profile_img: req.body.user_profile_img,
//     bio: req.body.bio,
//     main_character: req.body.main_character,
//     secondary_character: req.body.secondary_character,
//     slippi_usernames: req.body.slippi_usernames,
//   };
//   // const valid = schema.validate(newUser);

//   // if(valid.error) {
//   //    return res.status(400).send(valid.error)
//   // }

//   db.oneOrNone(
//     "INSER INTO users (username, password, first_name, last_name, email, birthdate, city, state, country, zip, user_profile_img, bio, main_character, secondary_character, slippi_usernames) values \
//      ($(username), $(password), $(first_name), $(last_name), $(email), $(birthdate), $(city), $(state), $(country), $(zip), $(user_profile_img),\
//        $(bio), $(main_character), $(secondary_character), $(slippi_usernames) returning id",
//     newUser
//   )

//     .then((id) => {
//       db.one("SELECT * FROM users WHERE id = $(id)", { id: id.id }).then(
//         (todo) => res.json(todo)
//       );
//     })
//     .catch((error) => res.status(500).send(error));
// });

userRoutes.post("/signup", (req, res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const newUser = {
        username: req.body.username,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        birthdate: req.body.birthdate,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zip: req.body.zip,
      };
      db.one(
        "INSERT INTO users ( username, password, first_name, last_name, email, birthdate, city, state, country, zip ) VALUES \
            ( ${username}, ${password}, ${first_name}, ${last_name}, ${email}, ${birthdate}, ${city}, ${state}, ${country}, ${zip} ) RETURNING id;",
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

userRoutes.post("/login", (req, res) => {
  const userLoginInput = {
    username: req.body.username,
    password: req.body.password,
  };

  db.oneOrNone(
    "SELECT id, email, username, password, first_name, last_name, birthdate, city, state, country, zip, bio, main_character, secondary_characters, slippi_usernames FROM users WHERE username = $(username)",
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

export default userRoutes;
