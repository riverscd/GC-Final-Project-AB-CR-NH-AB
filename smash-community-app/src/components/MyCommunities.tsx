import { createTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../contexts/UserContext";
import { Community } from "../models/communities";
import {
  GetCommunitiesByCreator,
  GetMultipleCommunitiesById,
} from "../services/communities";

export function MyCommunities() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { loggedInUser } = useContext(userContext);
  const [usersCreatedCommunities, setUsersCreatedCommunities] =
    useState<Community[]>();
  const [usersJoinedCommunities, setUsersJoinedCommunities] = useState<any[]>(
    []
  );

  useEffect(() => {
    if (loggedInUser?.id) {
      GetCommunitiesByCreator(loggedInUser?.id).then((data: Community[]) => {
        console.log(data);
        setUsersCreatedCommunities(data);
      });
    }
    if (loggedInUser?.added_event_ids) {
      GetMultipleCommunitiesById(loggedInUser.added_event_ids).then(
        (data: any) => {
          setUsersJoinedCommunities(data);
        }
      );
    }
  }, []);

  return (
    <div>
      <h1>Communities</h1>

      <label>
        <h2>Created Communities:</h2>

        <ul>
          {usersCreatedCommunities?.map((createdCommunity) => (
            <li key={createdCommunity.id}>
              <h3>{createdCommunity.community_name}</h3>
              <p>{createdCommunity.location}</p>
              <p>{createdCommunity.description}</p>
              <button>Edit Community</button>
            </li>
          ))}
        </ul>
      </label>
      <label>
        <h2>Joined Communities:</h2>

        <ul>
          {usersJoinedCommunities?.map((createdCommunity) => (
            <li key={createdCommunity.id}>
              <h3>{createdCommunity.community_name}</h3>
              <p>{createdCommunity.location}</p>
              <p>{createdCommunity.description}</p>
            </li>
          ))}
        </ul>
      </label>
      <Link to="/sitenav">Home</Link>
    </div>
  );
}
