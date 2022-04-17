import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Community } from "../models/communities";
import { GetAllCommunities } from "../services/communities";

export function CommunityFinder() {
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [state, setState] = useState<string | undefined>("");

  useEffect(() => {
    GetAllCommunities().then((data: any) => {
      setAllCommunities(data);
    });
  }, []);

  return (
    <div>
       <h1>Community Finder</h1>
     
      <div>
        {allCommunities?.map((community: Community) => (
          <ul>
            <li key={community.id}>Community Name: {`${community.community_name}`}</li>
            <li>Location: {`${community.location}`}</li>
            <li>Description: {`${community.description}`}</li>
          </ul>
        ))}
      </div>
      <Link to="/sitenav">Home</Link>
    </div>
  );
}
