import express from "express";
import fetch from 'node-fetch';

//import { db } from "../index"

const tournamentroutes = express.Router();

tournamentroutes.get('/tournaments', (req: any, res: any) => {
     const perPage = 3;
     const videogameId = 1;
    const query = `query TournamentsByVideogame($perPage: Int!, $videogameId: ID!) {
        tournaments(query: {
          perPage: $perPage
          page: 1
          sortBy: "startAt asc"
          filter: {
            past: false
            videogameIds: [
              $videogameId
            ]
          }
        }) {
          nodes {
            id
            name
            slug
          }
        }
      }
      `;

    fetch('https://api.smash.gg/gql/alpha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": "Bearer 95339d7dc9220792c3d97d93fb8b1fa6"
        },
        body: JSON.stringify({
            query,
            variables: { perPage, videogameId },
        })
    })
        .then(r => r.json())
       // .then(data => console.log('data returned:', data))
        .then(data => res.status(200).json(data));
})

export default tournamentroutes;