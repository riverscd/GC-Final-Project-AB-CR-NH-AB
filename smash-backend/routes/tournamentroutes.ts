import express from "express";
import fetch from "node-fetch";
// import { ProcessEnv } from "../models/envModel";

// import { db } from "../index"

const tournamentroutes = express.Router();

tournamentroutes.get("/tournaments", (req: any, res: any) => {
  const perPage = 5;
  const videogameId = 1;
  const past = false;
  const token = process.env.SMASH_AUTH_TOKEN!;

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
                  city
                  state
                  postalCode
                  venueName
                  countryCode
                  endAt
                  events{competitionTier
                    name}
                  hasOfflineEvents
                  hasOnlineEvents
                  images{url}
                  isRegistrationOpen
                  name
                  numAttendees
                  registrationClosesAt
                  slug
                  startAt
          }
        }
      }
      `;

  fetch("https://api.smash.gg/gql/alpha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { perPage, videogameId, past },
    }),
  })
    .then((r) => r.json())
    // .then(data => console.log('data returned:', data))
    .then((data) => res.status(200).json(data));
});

tournamentroutes.get(`/tournaments/bystate`, (req: any, res: any) => {
  const perPage: number = 5;
  const videogameId: number = 1;
  // const past : boolean = false;
  const token : string = process.env.SMASH_AUTH_TOKEN!;
  const addrState: string =  req.query.state;
  const query : string = `
  query TournamentsByVideogameAndState($perPage: Int!, $videogameId: ID!, $addrState: String!) {
    tournaments(query: {
      perPage: $perPage
      page: 1
      filter: {
        videogameIds: [$videogameId]
        addrState: $addrState,
      }
    }){
      nodes {
        id
        name
              city
              addrState
              postalCode
              venueName
              countryCode
              endAt
              events{competitionTier
                name}
              hasOfflineEvents
              hasOnlineEvents
              images{url}
              isRegistrationOpen
              name
              numAttendees
              registrationClosesAt
              slug
              startAt
      }
    }
  }
  `;

  fetch("https://api.smash.gg/gql/alpha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { perPage, videogameId, addrState },
    }),
  })
  .then((r) => r.json())
  // .then(data => console.log('data returned:', data))
 .then((data) => res.status(200).json(data));
})

export default tournamentroutes;
