import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Community } from "../models/communities";
import { GetAllCommunities, GetCommunitiesByLocation } from "../services/communities";

export function CommunityFinder() {
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [location, setLocation] = useState<string | undefined>("");

  useEffect(() => {
    GetAllCommunities().then((data: any) => {
      setAllCommunities(data);
    });
  }, []);

  function handleSubmit(e: any) { 
    e.preventDefault(); 
    GetCommunitiesByLocation(location as string).then((data: Community[]) : void => {
      setAllCommunities(data)
    }) 
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
