import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Community } from "../models/communities";
import { GetAllCommunities } from "../services/communities";

export function CommunityFinder() {
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);

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
            <li key={community.id}>{`${community.community_name}`}</li>
            <li>{`${community.location}`}</li>
            <li>{`${community.description}`}</li>
          </ul>
        ))}
      </div>
      <Link to="/sitenav">Home</Link>
    </div>
  );
}
