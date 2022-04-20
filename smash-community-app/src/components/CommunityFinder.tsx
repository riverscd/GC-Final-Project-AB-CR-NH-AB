import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../contexts/UserContext";
import { Community } from "../models/communities";
import {
  GetAllCommunities,
  GetCommunitiesByLocation,
} from "../services/communities";
import { AddCommunityToUser } from "../services/users";

export function CommunityFinder() {
  const { loggedInUser } = useContext(userContext);
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [location, setLocation] = useState<string | undefined>("");

  useEffect(() => {
    GetAllCommunities().then((data: any) => {
      setAllCommunities(data);
    });
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    GetCommunitiesByLocation(location as string).then(
      (data: Community[]): void => {
        setAllCommunities(data);
      }
    );
  }
  function handleAddCommunity(communityId: number) {
    console.log(communityId);
    if (loggedInUser) {
      AddCommunityToUser(loggedInUser?.id, communityId).then((data: any) => {
        console.log(data);
      });
    }
  }
  return (
    <div>
      <h1>Community Finder</h1>
      <form>
        <label>
          <p>Search by Location:</p>
          <input type="text" onChange={(e) => setLocation(e.target.value)} />
        </label>
        <button className="button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>

      <div>
        {allCommunities?.map((community: Community) => (
          <ul>
            <li key={community.id}>
              Community Name: {`${community.community_name}`}
            </li>
            <li>Location: {`${community.location}`}</li>
            <li>Description: {`${community.description}`}</li>
            <button onClick={() => handleAddCommunity(community.id)}>
              Join Community
            </button>
          </ul>
        ))}
      </div>
      <Link to="/sitenav">Home</Link>
    </div>
  );
}
